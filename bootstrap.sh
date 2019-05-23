#!/bin/sh
set -ex

oss=packages-oss.txt
dest=fusion

rm -rf $dest
mkdir -p $dest

git clone https://github.com/fusionjs/fusionjs.git

while read -r repo
do
  mv fusionjs/$repo $dest/$repo
done < $oss

rm -rf fusionjs

# Custom handling for fusionjs.github.io
mkdir -p fusion/fusion-docs
