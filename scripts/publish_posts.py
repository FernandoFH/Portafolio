#!/usr/bin/env python3
"""
Detects posts that transitioned draft→published in this push
and publishes them to their specified platform (Medium or Dev.to).

Triggered by GitHub Actions on push to main when posts change.
Requires secrets: MEDIUM_INTEGRATION_TOKEN, DEVTO_API_KEY.
"""
import os
import sys
import subprocess
import yaml
import requests


def parse_frontmatter(content):
    if not content.startswith('---'):
        return {}, content
    parts = content.split('---', 2)
    if len(parts) < 3:
        return {}, content
    return yaml.safe_load(parts[1]), parts[2].strip()


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


def publish_to_medium(meta, body):
    token = os.environ['MEDIUM_INTEGRATION_TOKEN']

    user_resp = requests.get(
        'https://api.medium.com/v1/me',
        headers={'Authorization': f'Bearer {token}'},
        timeout=15,
    )
    user_resp.raise_for_status()
    user_id = user_resp.json()['data']['id']

    payload = {
        'title': meta['title'],
        'contentFormat': 'markdown',
        'content': f"# {meta['title']}\n\n{body}",
        'tags': meta.get('tags', [])[:5],  # Medium allows max 5 tags
        'publishStatus': 'public',
    }
    if meta.get('description'):
        payload['canonicalUrl'] = ''  # placeholder; update if canonical URL is needed

    resp = requests.post(
        f'https://api.medium.com/v1/users/{user_id}/posts',
        headers={
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json',
        },
        json=payload,
        timeout=15,
    )
    resp.raise_for_status()
    url = resp.json()['data']['url']
    print(f"  Published to Medium: {url}")
    return url


def publish_to_devto(meta, body):
    api_key = os.environ['DEVTO_API_KEY']

    payload = {
        'article': {
            'title': meta['title'],
            'body_markdown': body,
            'published': True,
            'tags': meta.get('tags', [])[:4],  # Dev.to allows max 4 tags
            'description': meta.get('description', ''),
        }
    }

    resp = requests.post(
        'https://dev.to/api/articles',
        headers={
            'api-key': api_key,
            'Content-Type': 'application/json',
        },
        json=payload,
        timeout=15,
    )
    resp.raise_for_status()
    url = resp.json()['url']
    print(f"  Published to Dev.to: {url}")
    return url


def main():
    changed = get_changed_posts()
    if not changed:
        print("No post files changed — nothing to publish.")
        return

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

        if not was_draft_before(filepath):
            print(f"Skipping {filepath}: already published in a prior commit")
            continue

        platform = meta.get('platform')
        print(f"\nPublishing '{meta.get('title')}' → {platform}")

        try:
            if platform == 'medium':
                publish_to_medium(meta, body)
            elif platform == 'devto':
                publish_to_devto(meta, body)
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
