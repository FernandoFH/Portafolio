#!/usr/bin/env python3
"""
Detects posts that transitioned draft→published in this push and routes each
one to a SINGLE platform according to its tags (see publish-map.yml).

Routing rules:
  1. An explicit `platform:` in the post frontmatter overrides everything.
  2. Otherwise, post tags are scanned in frontmatter order; the first tag
     found in publish-map.yml decides the platform (and publication).
  3. No match → the post stays blog-only (notice, not an error).

Platforms:
  - devto:    create-or-update via API (secret DEVTO_API_KEY). First publish
              POSTs and stores the returned id as `devtoId` in the frontmatter;
              later edits to a published post PUT that id (the blog stays the
              source of truth). `series` groups posts into a Dev.to series.
  - medium:   write API deprecated — a GitHub issue with the import checklist
              is opened instead (first publish only, no update API).
  - substack: no official API — a GitHub issue with the manual steps is opened
              instead (first publish only, no update API).

Triggered by GitHub Actions on push to Dev when posts change.
"""
import os
import sys
import subprocess
import yaml
import requests

SITE_URL = "https://fernandoh.com"
PUBLISH_MAP = "publish-map.yml"


def parse_frontmatter(content):
    if not content.startswith('---'):
        return {}, content
    parts = content.split('---', 2)
    if len(parts) < 3:
        return {}, content
    return yaml.safe_load(parts[1]), parts[2].strip()


def set_frontmatter_field(filepath, key, value):
    """Insert or replace `key: value` inside the frontmatter of filepath,
    without touching the rest of the YAML. Used to store the Dev.to article id."""
    with open(filepath) as f:
        lines = f.readlines()

    if not lines or lines[0].strip() != '---':
        return
    end = next((i for i in range(1, len(lines)) if lines[i].strip() == '---'), None)
    if end is None:
        return

    new_line = f"{key}: {value}\n"
    for i in range(1, end):
        if lines[i].startswith(f"{key}:"):
            lines[i] = new_line
            break
    else:
        lines.insert(end, new_line)

    with open(filepath, 'w') as f:
        f.writelines(lines)


def load_tag_index(path=PUBLISH_MAP):
    """tag -> (platform, publication name). Warns on tags mapped twice."""
    with open(path) as f:
        data = yaml.safe_load(f)

    index = {}
    for platform, cfg in (data.get('platforms') or {}).items():
        for pub in (cfg.get('publications') or []):
            for tag in (pub.get('tags') or []):
                t = str(tag).lower()
                if t in index:
                    prev_platform, prev_pub = index[t]
                    print(f"WARNING: tag '{t}' ya mapeado a {prev_platform} "
                          f"({prev_pub}) — se ignora el duplicado en {platform}")
                    continue
                index[t] = (platform, pub.get('name'))
    return index


def resolve_platform(meta, tag_index):
    """Returns (platform, publication, reason) or (None, None, None)."""
    if meta.get('platform'):
        return meta['platform'], None, 'override en frontmatter'
    for tag in (meta.get('tags') or []):
        t = str(tag).lower()
        if t in tag_index:
            platform, publication = tag_index[t]
            return platform, publication, f"tag '{t}'"
    return None, None, None


def get_changed_posts():
    result = subprocess.run(
        ['git', 'diff', '--name-only', 'HEAD~1', 'HEAD', '--', 'src/content/posts/'],
        capture_output=True, text=True
    )
    return [f for f in result.stdout.strip().split('\n') if f.endswith('.md') and f]


def was_draft_before(filepath):
    """True if file was draft (or new) in HEAD~1 — i.e. this push is the first publish."""
    result = subprocess.run(
        ['git', 'show', f'HEAD~1:{filepath}'],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        return True  # file is new
    meta, _ = parse_frontmatter(result.stdout)
    return meta.get('status') != 'published'


def open_issue(title, body):
    try:
        r = subprocess.run(
            ['gh', 'issue', 'create', '--title', title, '--body', body],
            capture_output=True, text=True
        )
        if r.returncode == 0:
            print(f"  Issue creado: {r.stdout.strip()}")
        else:
            print(f"  (No se pudo crear el issue: {r.stderr.strip()})")
    except FileNotFoundError:
        print("  (gh no disponible — seguí los pasos impresos arriba)")


def publish_to_medium(meta, slug, publication):
    canonical_url = f"{SITE_URL}/blog/{slug}/"
    pub_line = f" y agregalo a la publication **{publication}**" if publication else ""
    print(f"  Medium: la API de escritura está deprecada — import manual.")
    print(f"  1. Abrir https://medium.com/p/import y pegar: {canonical_url}")
    print(f"  2. Agregar el artículo a la publication: {publication or '(ninguna)'}")
    print(f"  3. Cerrar el loop: ./scripts/set-canonical.sh {slug} <url-de-medium>")
    open_issue(
        f"Publicar manualmente: {meta['title']} → Medium",
        f"El post **{meta['title']}** ya está publicado en el blog y su destino es "
        f"**Medium**{' — ' + publication if publication else ''}.\n\n"
        f"- [ ] Abrir https://medium.com/p/import e importar: {canonical_url}\n"
        f"- [ ] Verificar que Medium detectó el canonical hacia el blog{pub_line}\n"
        f"- [ ] Cerrar el loop: `./scripts/set-canonical.sh {slug} <url-de-medium>`\n"
    )


def publish_to_substack(meta, slug, publication):
    canonical_url = f"{SITE_URL}/blog/{slug}/"
    print(f"  Substack: sin API oficial — publicación manual.")
    print(f"  1. Nuevo post en {publication or 'tu Substack'}: substack.com/publish/post/new")
    print(f"  2. Pegar el Markdown del post")
    print(f"  3. SEO settings → canonical URL: {canonical_url}")
    print(f"  4. Cerrar el loop: ./scripts/set-canonical.sh {slug} <url-de-substack>")
    open_issue(
        f"Publicar manualmente: {meta['title']} → Substack",
        f"El post **{meta['title']}** ya está publicado en el blog y su destino es "
        f"**Substack**{' — ' + publication if publication else ''}.\n\n"
        f"- [ ] Crear el post en substack.com/publish/post/new y pegar el Markdown\n"
        f"- [ ] SEO settings → canonical URL: {canonical_url}\n"
        f"- [ ] Cerrar el loop: `./scripts/set-canonical.sh {slug} <url-de-substack>`\n"
    )


def publish_to_devto(meta, body, slug, filepath):
    """Create the article on first publish, or update it on later edits.

    Idempotency key is `devtoId` in the post frontmatter: absent → POST (create)
    and the returned id is written back into the .md; present → PUT (update)."""
    api_key = os.environ['DEVTO_API_KEY']
    canonical_url = f"{SITE_URL}/blog/{slug}/"
    headers = {'api-key': api_key, 'Content-Type': 'application/json'}

    article = {
        'title': meta['title'],
        'body_markdown': body,
        'published': True,
        'tags': meta.get('tags', [])[:4],  # Dev.to allows max 4 tags
        'description': meta.get('description', ''),
        'canonical_url': canonical_url,
    }
    if meta.get('series'):
        article['series'] = meta['series']  # native Dev.to series grouping

    devto_id = meta.get('devtoId')

    if devto_id:
        resp = requests.put(
            f'https://dev.to/api/articles/{devto_id}',
            headers=headers, json={'article': article}, timeout=15,
        )
        resp.raise_for_status()
        url = resp.json()['url']
        print(f"  Updated on Dev.to (id {devto_id}): {url}")
        return url

    resp = requests.post(
        'https://dev.to/api/articles',
        headers=headers, json={'article': article}, timeout=15,
    )
    resp.raise_for_status()
    data = resp.json()
    set_frontmatter_field(filepath, 'devtoId', data['id'])
    # Link the blog card/post to the live article (falls back to the profile
    # while draft). Respect a canonicalUrl the author set by hand.
    if not meta.get('canonicalUrl'):
        set_frontmatter_field(filepath, 'canonicalUrl', f'"{data["url"]}"')
    print(f"  Published to Dev.to (id {data['id']}): {data['url']}")
    return data['url']


def main():
    changed = get_changed_posts()
    if not changed:
        print("No post files changed — nothing to publish.")
        return

    tag_index = load_tag_index()
    published_count = 0
    errors = []

    for filepath in changed:
        if not os.path.exists(filepath):
            print(f"Skipping {filepath}: deleted")
            continue

        with open(filepath) as f:
            content = f.read()

        meta, body = parse_frontmatter(content)

        if meta.get('status') != 'published':
            print(f"Skipping {filepath}: status={meta.get('status')!r}")
            continue

        platform, publication, reason = resolve_platform(meta, tag_index)
        slug = os.path.basename(filepath).replace('.md', '')

        if not platform:
            print(f"\nAviso: '{meta.get('title')}' no tiene ningún tag mapeado en "
                  f"{PUBLISH_MAP} — queda publicado solo en el blog.")
            continue

        # Medium/Substack no tienen API de update: sólo actuamos en la primera
        # transición draft→published. Dev.to sí actualiza en cada edición.
        first_publish = was_draft_before(filepath)
        if platform in ('medium', 'substack') and not first_publish:
            print(f"Skipping {filepath}: ya publicado y {platform} no tiene API de update")
            continue

        dest = f"{platform}" + (f" ({publication})" if publication else "")
        verb = "Publishing" if first_publish else "Updating"
        print(f"\n{verb} '{meta.get('title')}' → {dest} [vía {reason}]")

        try:
            if platform == 'devto':
                publish_to_devto(meta, body, slug, filepath)
            elif platform == 'medium':
                publish_to_medium(meta, slug, publication)
            elif platform == 'substack':
                publish_to_substack(meta, slug, publication)
            else:
                print(f"  Unknown platform '{platform}' — skipping")
                continue
            published_count += 1
        except requests.HTTPError as e:
            msg = f"HTTP {e.response.status_code}: {e.response.text}"
            print(f"  ERROR: {msg}", file=sys.stderr)
            errors.append((filepath, msg))
        except Exception as e:
            print(f"  ERROR: {e}", file=sys.stderr)
            errors.append((filepath, str(e)))

    print(f"\nDone. Published {published_count} post(s).")

    if errors:
        print("\nFailed posts:", file=sys.stderr)
        for path, msg in errors:
            print(f"  {path}: {msg}", file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
