# Guía de publicación

## Flujo completo

```
1. new-post.sh       → crea el .md con status: draft
2. Escribís el post  → editás el archivo y le ponés tags
3. status: published → el pipeline rutea por tags y publica (o abre un issue con los pasos manuales)
```

**El blog es la fuente de verdad.** Cada post se publica en UNA sola plataforma,
decidida por sus tags según [`publish-map.yml`](./publish-map.yml).

---

## 1. Crear un nuevo post

```bash
./scripts/new-post.sh "Título del Post"
```

Crea `src/content/posts/titulo-del-post.md` con `status: draft`.

## 2. Campos del frontmatter

```yaml
title: "Título visible"
date: 2026-07-18
status: draft           # draft | published
tags: [golang, sre]     # ¡deciden la plataforma! ver publish-map.yml
description: "Descripción corta del post."
platform: medium        # OPCIONAL — override manual, pisa el ruteo por tags
canonicalUrl: ""        # opcional — ver sección Canonical URL
series: "Algorithms"    # OPCIONAL — agrupa posts; se refleja como serie en Dev.to
devtoId: 123456         # AUTO — lo escribe el pipeline; no lo edites a mano
```

## 3. Ruteo por tags (publish-map.yml)

Reglas, en orden:

1. Si el post tiene `platform:` explícito → esa plataforma (override).
2. Se recorren los tags **en el orden del frontmatter**; el primer tag que
   aparezca en `publish-map.yml` define plataforma y publication.
3. Ningún tag mapeado → el post queda **solo en el blog** (el workflow deja
   un aviso, no falla).

Mapa actual (editable en `publish-map.yml`):

| Plataforma | Publication | Tags |
|---|---|---|
| Substack | Ceiba Research | bitcoin, finance, quant, markets, trading |
| Medium | SRE en Español | sre, observability, observabilidad, kubernetes, devops, opentelemetry |
| Medium | Cpp en Español | c++, cpp |
| Medium | TensorFlow en Español | tensorflow, machine-learning, ml, ai |
| Medium | Golang en Español | golang, go, goroutines, concurrencia |
| Dev.to | — | system-design, algorithms, algoritmos, data-structures, software-architecture, scalability, escalabilidad, software-engineering, programming, performance, memory, distributed-systems, papers |

## 4. Publicar

```bash
# → editá el .md, cambiá status: published
git add src/content/posts/mi-post.md
git commit -m "publish: mi-post"
git push origin Dev
```

GitHub Actions detecta la transición draft→published y según la plataforma ruteada:

### Dev.to — automático (con actualizaciones)
`publish_posts.py` sube el artículo vía API con `canonical_url` apuntando a
`fernandoh.com/blog/mi-post/`. Requiere el secret `DEVTO_API_KEY`.

**Primera publicación:** `POST` crea el artículo y el pipeline escribe el
`devtoId` de vuelta en el frontmatter (commit automático `[skip ci]`).

**Ediciones posteriores:** cada push que toque un post `published` con `devtoId`
hace `PUT` y **actualiza** el artículo en Dev.to (título, cuerpo, tags, serie).
El blog sigue siendo la fuente de verdad — editás el `.md`, pusheás, y Dev.to se
sincroniza solo. (Medium/Substack no tienen API de update: sólo primera publicación.)

### Series (agrupar posts)

Dev.to agrupa como serie todos los posts que compartan el mismo `series`.
No hay que "crear" la serie aparte: nace con el primer post que la use.

```bash
./scripts/set-series.sh "Algorithms" bigo-notation data-structures-everyone-should-know
```

Inserta/reemplaza `series: "Algorithms"` en el frontmatter de cada post. Después
commit & push como siempre.

### Medium — semi-manual (API de escritura deprecada)
El workflow **abre un issue en GitHub** con el checklist:
1. Importar en `medium.com/p/import` pegando la URL del post
2. Agregar el artículo a la publication que indicó el mapa
3. Cerrar el loop: `./scripts/set-canonical.sh <slug> <url-de-medium>`

### Substack — manual (sin API oficial)
El workflow **abre un issue en GitHub** con el checklist:
1. Nuevo post en `substack.com/publish/post/new`, pegar el Markdown
2. SEO settings → canonical URL hacia el blog
3. Cerrar el loop: `./scripts/set-canonical.sh <slug> <url-de-substack>`

---

## 5. Canonical URL

Si el post vive originalmente en una plataforma externa y querés que Google la
trate como fuente original, agregá al frontmatter:

```yaml
canonicalUrl: "https://medium.com/@FernandoFH/tu-articulo-abc123"
```

- El `<link rel="canonical">` del sitio apuntará a la URL externa
- El `og:url` seguirá apuntando a `fernandoh.com` (para compartir en redes)
- Sin `canonicalUrl`, el canonical apunta a `fernandoh.com` por defecto

**En el Blog**: con `canonicalUrl` aparece el chip `Medium ↗` linkeando al
artículo real; sin él, el chip solo aparece si hay `platform:` explícito.

### Atajo: `set-canonical.sh`

```bash
./scripts/set-canonical.sh <slug> <url>
```

Edita el `.md` automáticamente (inserta si falta, reemplaza si ya existe — sin
romper el YAML). Después solo commiteás y pusheás.

---

## 6. Secrets necesarios en GitHub

| Secret | Plataforma | Dónde conseguirlo |
|---|---|---|
| `DEVTO_API_KEY` | Dev.to | dev.to/settings/extensions → API Keys |

(Los issues de Medium/Substack usan el `GITHUB_TOKEN` automático del workflow.)

---

## Referencia rápida

```bash
# Nuevo post
./scripts/new-post.sh "Mi Título"

# Tags → plataforma (primer tag mapeado gana)
# ej.: tags: [golang, sre]  → Medium (Golang en Español)
#      tags: [system-design] → Dev.to
#      tags: [bitcoin]       → Substack (Ceiba Research)

# Publicar
# → cambiá status: published, commit & push a Dev
```
