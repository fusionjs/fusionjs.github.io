#!/bin/sh
set -ex

oss=packages-oss.txt
dest=fusion

rm -rf $dest
mkdir -p $dest

while read -r repo
do
  git clone https://github.com/fusionjs/$repo.git $dest/$repo
done < $oss

# Custom handling for fusionjs.github.io
mkdir -p fusion/fusion-docs
