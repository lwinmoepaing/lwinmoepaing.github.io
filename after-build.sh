tmp=$(mktemp)

jq -s '.[0] * .[1]' ./public/manifest.json ./dist/public/manifest.json  > $tmp

mv "$tmp" ./dist/public/manifest.json