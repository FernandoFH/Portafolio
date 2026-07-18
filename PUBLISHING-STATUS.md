# Estado del pipeline de publicación

_Última revisión: 2026-07-18_

Resumen: **flujo por tags implementado y funcionando.** El blog es la fuente de
verdad; cada post se publica en UNA sola plataforma decidida por sus tags según
[`publish-map.yml`](./publish-map.yml). Detalle en [PUBLISHING.md](./PUBLISHING.md).

## Qué está andando

| Pieza | Estado | Notas |
|---|---|---|
| Ruteo por tags | ✅ Activo | Primer tag del post que aparezca en `publish-map.yml` define la plataforma. `platform:` en el frontmatter actúa como override opcional. Sin match → solo blog + aviso. |
| Workflow `publish.yml` | ✅ Activo | Corre en cada push a `Dev` que toque `src/content/posts/`. Solo publica en la transición draft→published. |
| Secret `DEVTO_API_KEY` | ✅ Configurado | Cargado en GitHub el 2026-06-01. |
| Dev.to | ✅ Automático | Publica vía API con canonical a fernandoh.com. |
| Medium | ⚙️ Semi-manual | API de escritura deprecada. El workflow **abre un issue** con el checklist (import + publication + set-canonical). |
| Substack | ⚙️ Semi-manual | Sin API oficial. El workflow **abre un issue** con el checklist (pegar Markdown + canonical + set-canonical). |
| `new-post.sh` / `set-canonical.sh` | ✅ Listos | Crear posts (sin plataforma — la deciden los tags) / fijar canonical sin romper el YAML. |

## Decisiones de diseño (2026-07-18)

- **Una plataforma por post**, derivada de tags — no multi-publicación.
- **Conflictos**: el primer tag del post (en orden del frontmatter) gana.
- **Sin match**: el post queda solo en el blog, con aviso — no falla.
- **Override**: `platform:` explícito en el frontmatter pisa el mapa.
- El campo `publication` del frontmatter se eliminó (ahora vive en el mapa).

## Ideas pendientes (opcionales, nada bloquea)

- Automatizar Substack (solo hay API no oficial, frágil — evaluar si vale la pena).
- Mostrar en el blog la plataforma destino derivada de tags (hoy el chip aparece
  con `canonicalUrl` o `platform:` explícito).
