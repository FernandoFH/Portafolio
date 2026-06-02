#!/usr/bin/env bash
# Usage: ./scripts/new-post.sh "Título del Post" [publication]
# Example: ./scripts/new-post.sh "What Every Programmer Should Know About Memory" papers
#
# Platforms:  medium | devto | substack
#
# Publications:
#   sre | cpp | tensorflow | golang | quantum | ai | bitcoin | papers | ceiba | stuff | coporo

set -e

TITLE="$1"
PUBLICATION="${2:-stuff}"

if [ -z "$TITLE" ]; then
  echo "Error: falta el título del post"
  echo ""
  echo "Uso: ./scripts/new-post.sh \"Título del Post\" [publication]"
  echo ""
  echo "Platforms:      medium | devto | substack"
  echo "Publications:   sre | cpp | tensorflow | golang | quantum | ai | bitcoin | papers | ceiba | stuff | coporo"
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
platform: devto
publication: $PUBLICATION
tags: []
description: ""
---

Escribe tu post aquí.
EOF

echo "✓ Creado: src/content/posts/$SLUG.md"
echo "  Título:  $TITLE"
echo "  → Edita el archivo, cambia status a 'published' cuando esté listo"
echo "  → git add . && git commit -m 'post: $SLUG' && git push origin Dev"
