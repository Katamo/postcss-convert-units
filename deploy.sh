#!/bin/sh

rm -rf dist
mkdir dist

deno task bundle
cp -rf src/* dist/

mv src/index.js dist/index.js

ls