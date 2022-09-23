#!/bin/sh

rm -rf dist
mkdir dist

deno task bundle
cp -rf src/* dist/

ls