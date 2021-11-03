#!/bin/sh

echo '${{ steps.hello.outputs.output }}' > demo.json
git config user.email "actions@github.com"
git config user.name "hehe"
git add --all
git commit -m "Update json" || echo "No changes to commit"
git push