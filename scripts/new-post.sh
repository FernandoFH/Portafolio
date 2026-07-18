#!/usr/bin/env bash
# Usage: ./scripts/new-post.sh "Título del Post"
# Example: ./scripts/new-post.sh "What Every Programmer Should Know About Memory"
#
# La plataforma destino NO se elige acá: la deciden los tags del post
# según publish-map.yml (el primer tag mapeado define la plataforma).
# Para forzar una plataforma puntual, agregá `platform: medium|devto|substack`
# al frontmatter.

set -e

TITLE="$1"

if [ -z "$TITLE" ]; then
  echo "Error: falta el título del post"
  echo ""
  echo "Uso: ./scripts/new-post.sh \"Título del Post\""
  echo ""
  echo "El destino lo deciden los tags según publish-map.yml"
  exit 1
fi

# Genera el slug: minúsculas, espacios→guiones, quita caracteres especiales
SLUG=$(echo "$TITLE" \
  | tr '[:upper:]' '[:lower:]' \
  | sed 's/[áàäâ]/a/g; s/[éèëê]/e/g; s/[íìïî]/i/g; s/[óòöô]/o/g; s/[úùüû]/u/g; s/[ñ]/n/g' \
  | sed 's/[^a-z0-9 ]//g' \
  | tr ' ' '-' \
  | sed 's/--*/-/g; s/^-//; s/-$//')

POSTS_DIR="$(dirname "$0")/../src/content/posts"
FILE="$POSTS_DIR/$SLUG.md"

if [ -f "$FILE" ]; then
  echo "Error: ya existe $FILE"
  exit 1
fi

DATE=$(date +%Y-%m-%d)

cat > "$FILE" << EOF
---
title: "$TITLE"
date: $DATE
status: draft
tags: []  # el primer tag mapeado en publish-map.yml define la plataforma
description: ""
---

Escribe tu post aquí.
EOF

echo "✓ Creado: src/content/posts/$SLUG.md"
echo "  Título:  $TITLE"
echo "  → Agregá tags (deciden la plataforma según publish-map.yml)"
echo "  → Edita el archivo, cambia status a 'published' cuando esté listo"
echo "  → git add . && git commit -m 'post: $SLUG' && git push origin Dev"
