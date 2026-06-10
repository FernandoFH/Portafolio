# Guía de publicación

## Flujo completo

```
1. new-post.sh       → crea el .md con status: draft
2. Escribís el post  → editás el archivo
3. status: published → el pipeline lo detecta y publica automático (o semi-manual)
```

---

## 1. Crear un nuevo post

```bash
./scripts/new-post.sh "Título del Post" [publication]
```

**Publications disponibles:**
| Plataforma | Publications |
|---|---|
| Medium | `sre` `cpp` `tensorflow` `golang` `quantum` `ai` `bitcoin` `papers` |
| Dev.to | `papers` |
| Substack | `ceiba` `stuff` `coporo` |

**Ejemplo:**
```bash
./scripts/new-post.sh "Introducción a eBPF" sre
```

Crea `src/content/posts/introduccion-a-ebpf.md` con `status: draft` y `platform: devto`.

**Cambiá `platform` en el frontmatter según dónde querés publicar:**
```yaml
platform: medium    # o devto, o substack
```

---

## 2. Campos del frontmatter

```yaml
title: "Título visible"
date: 2026-06-10
status: draft           # draft | published
platform: medium        # medium | devto | substack
publication: sre        # ver tabla arriba
tags: [golang, sre]
description: "Descripción corta del post."
canonicalUrl: ""        # opcional — ver sección Canonical URL más abajo
```

---

## 3. Publicar

### Dev.to — automático

1. Asegurate de tener el secret `DEVTO_API_KEY` en GitHub → Settings → Secrets
2. Cambiá `status: draft` → `status: published` y `platform: devto`
3. Pusheá a `Dev`:
   ```bash
   git add src/content/posts/tu-post.md
   git commit -m "publish: tu-post"
   git push origin Dev
   ```
4. GitHub Actions detecta el cambio, corre `publish_posts.py` y sube el artículo a Dev.to con `canonical_url` apuntando a `fernandoh.com/blog/tu-post/`.

### Medium — semi-manual

Medium deprecó su API de escritura, así que el flujo es:

1. Cambiá `status: published` y `platform: medium`
2. Pusheá a `Dev` (mismo comando de arriba)
3. GitHub Actions corre y **imprime** en los logs la URL de import:
   ```
   Medium: integration tokens are deprecated — manual import required.
   1. Open https://medium.com/p/import
   2. Paste: https://fernandoh.com/blog/tu-post/
   ```
4. Abrís `medium.com/p/import`, pegás la URL y Medium importa el contenido. Detecta el canonical automáticamente.

### Substack — manual (no automatizado)

El pipeline **no publica a Substack automáticamente**. Pasos manuales:

1. Escribí el post con `platform: substack` y `status: published`
2. Pusheá (el pipeline lo ignora porque no hay handler para substack)
3. Entrá a tu Substack (`substack.com/publish/post/new`)
4. Pegá el contenido del `.md` (Substack acepta Markdown)
5. En **SEO settings**, poné el canonical URL: `https://fernandoh.com/blog/tu-post/`

---

## 4. Canonical URL

Si el post fue publicado originalmente en una plataforma externa (Medium, Dev.to, Substack) y querés que Google la trate como la fuente original, agregá al frontmatter:

```yaml
canonicalUrl: "https://medium.com/@FernandoFH/tu-articulo-abc123"
```

- El `<link rel="canonical">` del sitio apuntará a la URL externa
- El `og:url` seguirá apuntando a `fernandoh.com` (para compartir en redes)
- Sin `canonicalUrl`, el canonical apunta a `fernandoh.com` por defecto

---

## 5. Secrets necesarios en GitHub

| Secret | Plataforma | Dónde conseguirlo |
|---|---|---|
| `DEVTO_API_KEY` | Dev.to | dev.to/settings/extensions → API Keys |

---

## Referencia rápida

```bash
# Nuevo post
./scripts/new-post.sh "Mi Título" sre

# Publicar
# → editá el .md, cambiá status: published
git add src/content/posts/mi-titulo.md
git commit -m "publish: mi-titulo"
git push origin Dev
```
