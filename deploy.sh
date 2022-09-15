#usr/bin/sh

rm -rf dist
mkdir dist

cp src/* dist/
deno task deploy
mv src/index.js dist/index.js