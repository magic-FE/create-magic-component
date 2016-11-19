// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
// @remove-on-eject-end

var path = require('path');
var fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/magic-FE/create-magic-component/issues/637
var appDirectory = fs.realpathSync(process.cwd());

function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/magic-FE/create-magic-component/issues/253.

// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders

// We will export `nodePaths` as an array of absolute paths.
// It will then be used by Webpack configs.
// Jest doesn’t need this because it already handles `NODE_PATH` out of the box.

var nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .map(resolveApp);

// config after eject: we're in ./config/
module.exports = {
  appRoot: resolveApp(''),
  appDist: resolveApp('dist'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/component/index.js'),
  appPackageJson: resolveApp('package.json'),
  appComponent: resolveApp('src/component'),
  appSrc: resolveApp('src'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  ownNodeModules: resolveApp('node_modules'),
  nodePaths: nodePaths
};

// @remove-on-eject-begin
function resolveOwn(relativePath) {
  return path.resolve(__dirname, relativePath);
}

// config before eject: we're in ./node_modules/magic-scripts/config/
module.exports = {
  appRoot: resolveApp(''),
  appDist: resolveApp('dist'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appComponent: resolveApp('src/component'),
  appSrc: resolveApp('src'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  // this is empty with npm3 but node resolution searches higher anyway:
  ownNodeModules: resolveOwn('../node_modules'),
  nodePaths: nodePaths
};
// @remove-on-eject-end

// config before publish: we're in ./packages/magic-scripts/config/
if (__dirname.indexOf(path.join('packages', 'magic-scripts', 'config')) !== -1) {
  module.exports = {
    appRoot: resolveOwn('../../../'),
    appDist: resolveOwn('../../../dist'),
    appBuild: resolveOwn('../../../build'),
    appPublic: resolveOwn('../template/public'),
    appHtml: resolveOwn('../template/public/index.html'),
    appIndexJs: resolveOwn('../template/src/index.js'),
    appPackageJson: resolveOwn('../package.json'),
    appComponent: resolveOwn('../template/src/component'),
    appSrc: resolveOwn('../template/src'),
    testsSetup: resolveOwn('../template/src/setupTests.js'),
    appNodeModules: resolveOwn('../node_modules'),
    ownNodeModules: resolveOwn('../node_modules'),
    nodePaths: nodePaths
  };
}
