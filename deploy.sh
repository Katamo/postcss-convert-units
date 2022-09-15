#usr/bin/sh

rm -rf dist
mkdir dist

cp -rf src/* dist/

deno task bundle
mv src/index.js dist/index.js

ls