#!/bin/bash
# Copyright (c) 2015-present, Facebook, Inc.
# All rights reserved.
#
# This source code is licensed under the BSD-style license found in the
# LICENSE file in the root directory of this source tree. An additional grant
# of patent rights can be found in the PATENTS file in the same directory.

# ******************************************************************************
# This releases an update to the `magic-scripts` package.
# Don't use `npm publish` for it.
# Read the release instructions:
# https://github.com/magic-FE/create-magic-component/blob/master/CONTRIBUTING.md#cutting-a-release
# ******************************************************************************

# Start in tasks/ even if run from root directory
cd "$(dirname "$0")"

# Exit the script on any command with non 0 return code
# We assume that all the commands in the pipeline set their return code
# properly and that we do not need to validate that the output is correct
set -e

# Echo every command being executed
set -x

# Go to root
cd ..
root_path=$PWD

# You can only release with npm >= 3
if [ $(npm -v | head -c 1) -lt 3 ]; then
  echo "Releasing requires npm >= 3. Aborting.";
  exit 1;
fi;

if [ -n "$(git status --porcelain)" ]; then
  echo "Your git status is not clean. Aborting.";
  exit 1;
fi

# This modifies package.json to copy all dependencies to bundledDependencies
node ./tasks/bundle-own-deps.js

# Update deps
# rm -rf node_modules
# rm -rf ~/.npm
# npm cache clear
# npm install

cd packages/magic-scripts
# Force dedupe
# npm dedupe

# Remove node_modules
# If not remove node_modules, publish will take much time
rm -rf node_modules

# Go!
# ./node_modules/.bin/lerna publish --independent "$@"
npm publish
