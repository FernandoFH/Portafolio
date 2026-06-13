#!/usr/bin/env bash
# Usage: ./scripts/set-canonical.sh <slug> <url>
# Example: ./scripts/set-canonical.sh hola-mundo-cpp https://medium.com/@FernandoFH/hola-mundo-abc123
#
# Updates (or inserts) `canonicalUrl: "<url>"` in the frontmatter of
# src/content/posts/<slug>.md. Prints the git commands to commit & push.

set -e

SLUG="$1"
URL="$2"

if [ -z "$SLUG" ] || [ -z "$URL" ]; then
  echo "Uso: ./scripts/set-canonical.sh <slug> <url>"
  echo ""
  echo "Ejemplo:"
  echo "  ./scripts/set-canonical.sh hola-mundo-cpp https://medium.com/@FernandoFH/hola-mundo-abc123"
  exit 1
fi

if [[ ! "$URL" =~ ^https?:// ]]; then
  echo "Error: URL inválida (debe empezar con http:// o https://)"
  exit 1
fi

FILE="$(dirname "$0")/../src/content/posts/$SLUG.md"

if [ ! -f "$FILE" ]; then
  echo "Error: no existe $FILE"
  echo "Tip: usá el slug del archivo, sin la extensión .md"
  exit 1
fi

awk -v url="$URL" '
  /^---$/ {
    fm++
    if (fm == 2 && !done) { print "canonicalUrl: \"" url "\""; done = 1 }
    print
    next
  }
  fm == 1 && /^canonicalUrl:/ {
    print "canonicalUrl: \"" url "\""
    done = 1
    next
  }
  { print }
' "$FILE" > "$FILE.tmp" && mv "$FILE.tmp" "$FILE"

echo "✓ canonicalUrl actualizada en src/content/posts/$SLUG.md"
echo "  → $URL"
echo ""
echo "Próximos pasos:"
echo "  git add src/content/posts/$SLUG.md"
echo "  git commit -m 'chore: set canonical url for $SLUG'"
echo "  git push origin Dev"
