#!/bin/bash
git stash save
git checkout -B gh-pages
git add -f build
git commit -n -am "Rebuild website"
git filter-branch -f --prune-empty --subdirectory-filter build
git push -f origin gh-pages
git checkout -
git stash pop
