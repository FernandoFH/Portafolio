#!/usr/bin/env bash
# Usage: ./scripts/new-post.sh <slug> [publication]
# Example: ./scripts/new-post.sh mi-post-de-go golang

set -e

SLUG="$1"
PUBLICATION="${2:-stuff}"

if [ -z "$SLUG" ]; then
  echo "Error: falta el slug del post"
  echo "Uso: ./scripts/new-post.sh <slug> [publication]"
  echo ""
  echo "Publications: sre cpp tensorflow golang quantum ai bitcoin papers ceiba stuff coporo"
  exit 1
fi

POSTS_DIR="$(dirname "$0")/../src/content/posts"
FILE="$POSTS_DIR/$SLUG.md"

if [ -f "$FILE" ]; then
  echo "Error: ya existe $FILE"
  exit 1
fi

DATE=$(date +%Y-%m-%d)

cat > "$FILE" << EOF
---
title: ""
date: $DATE
status: draft
platform: medium
publication: $PUBLICATION
tags: []
description: ""
---

Escribe tu post aquí.
EOF

echo "✓ Creado: src/content/posts/$SLUG.md"
echo "  → Edita el archivo, cambia status a 'published' cuando esté listo"
echo "  → git add . && git commit -m 'post: $SLUG' && git push origin Dev"
