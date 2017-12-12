#!/usr/bin/env bash

testname=$1

if [[ -z $testname ]]; then
  echo "No test name given"
  exit -1;
fi

if [[ "$testname" == *\/* ]] || [[ "$testname" == *\\* ]]; then
  echo "Invalid test name"
  exit -1;
fi

rm -Rf "$testname"

expect "$testname.expect" "$testname"

echo "Testing $testname"
cd $testname
npm install
npm run lint -- --fix
npm run tslint -- --fix
npm run lint
npm run tslint
npm test
npm run build
cd ..
