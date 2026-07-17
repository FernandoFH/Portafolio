# Estado del pipeline de publicación

_Última revisión: 2026-07-17_

Resumen: **el flujo está armado y funcionando.** No hay nada roto ni a medio hacer;
lo único no automatizado es lo que las plataformas no permiten automatizar.
Detalle del flujo en [PUBLISHING.md](./PUBLISHING.md).

## Qué está andando

| Pieza | Estado | Notas |
|---|---|---|
| Workflow `publish.yml` | ✅ Activo | Corre en cada push a `Dev` que toque `src/content/posts/`. Última corrida exitosa: 2026-06-15. |
| Secret `DEVTO_API_KEY` | ✅ Configurado | Cargado en GitHub el 2026-06-01. |
| Dev.to | ✅ Automático | `status: draft → published` + push ⇒ `publish_posts.py` sube el artículo con canonical a fernandoh.com. Solo publica en la transición (no re-publica posts viejos). |
| Medium | ⚙️ Semi-manual | Medium deprecó su API de escritura. El workflow imprime en los logs la URL para importar en `medium.com/p/import`; después cerrar el loop con `./scripts/set-canonical.sh <slug> <url>`. |
| Substack | ✋ Manual | Sin handler (a propósito). Copiar el Markdown y setear el canonical en SEO settings. |
| `new-post.sh` / `set-canonical.sh` | ✅ Listos | Crear posts con frontmatter correcto / fijar canonical sin romper el YAML. |

## Ideas pendientes (opcionales, nada bloquea)

- Automatizar Substack (solo hay API no oficial, frágil — evaluar si vale la pena).
- Que el workflow avise (issue o notificación) cuando un post de Medium queda
  esperando el import manual, en vez de solo dejarlo en los logs de Actions.
