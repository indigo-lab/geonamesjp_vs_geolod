# geonamesjp_vs_geolod
[GeoNames.jp](http://geonames.jp/) と [geolod.ex.nii.ac.jp](http://geolod.ex.nii.ac.jp/) とのリンクセット

## What's this?
GeoNames.jp と GeoNLP LOD Server のインスタンスの関係を owl:sameAs で結ぶリンクセットを作成するためのジェネレータです

## How to

    npm install
    node main.js > geonamejp_vs_geolod.nt.txt 2> geonamesjp_vs_geolod.err.nt.txt

## Note

Travis CI による自動ビルドの結果を gh-pages にホストしています。 ビルドが成功している場合は以下の URL からリンクセットを取得することができます。

* <http://indigo-lab.github.io/geonamesjp_vs_geolod/geonamesjp_vs_geolod.nt.txt>

[![Build Status](https://travis-ci.org/indigo-lab/geonamesjp_vs_geolod.svg?branch=master)](https://travis-ci.org/indigo-lab/geonamesjp_vs_geolod)
