#!/usr/bin/env bash
# Usage: ./scripts/set-series.sh "<serie>" <slug> [<slug> ...]
# Example: ./scripts/set-series.sh "Algorithms" bigo-notation data-structures-everyone-should-know
#
# Inserta (o reemplaza) `series: "<serie>"` en el frontmatter de cada post.
# En Dev.to la serie no se "crea" aparte: nace sola cuando el primer artículo
# usa ese nombre. Basta con darle a los posts el MISMO `series`.

set -e

SERIES="$1"
shift || true

if [ -z "$SERIES" ] || [ "$#" -eq 0 ]; then
  echo "Uso: ./scripts/set-series.sh \"<serie>\" <slug> [<slug> ...]"
  echo ""
  echo "Ejemplo:"
  echo "  ./scripts/set-series.sh \"Algorithms\" bigo-notation data-structures-everyone-should-know"
  exit 1
fi

POSTS_DIR="$(dirname "$0")/../src/content/posts"

for SLUG in "$@"; do
  FILE="$POSTS_DIR/$SLUG.md"

  if [ ! -f "$FILE" ]; then
    echo "✗ no existe $FILE — lo salto (usá el slug sin .md)"
    continue
  fi

  awk -v series="$SERIES" '
    /^---$/ {
      fm++
      if (fm == 2 && !done) { print "series: \"" series "\""; done = 1 }
      print
      next
    }
    fm == 1 && /^series:/ {
      print "series: \"" series "\""
      done = 1
      next
    }
    { print }
  ' "$FILE" > "$FILE.tmp" && mv "$FILE.tmp" "$FILE"

  echo "✓ series: \"$SERIES\" → src/content/posts/$SLUG.md"
done

echo ""
echo "Próximos pasos:"
echo "  git add src/content/posts/"
echo "  git commit -m 'chore: set series \"$SERIES\"'"
echo "  git push origin Dev"
