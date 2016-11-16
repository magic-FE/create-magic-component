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

// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'production';

// Load environment variables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({silent: true});

var chalk = require('chalk');
var exec = require('child_process').exec;
var fs = require('fs-extra');
var path = require('path');
var rimrafSync = require('rimraf').sync;
var paths = require('../config/paths');
var checkRequiredFiles = require('magic-dev-utils/checkRequiredFiles');

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  console.error('Please detect whether the following file exists:\n' + paths.app.appHtml + '\n' + paths.appIndexJs + '\n');
  process.exit(1);
}

// Remove all content but keep the directory so that
// if you're in it, you don't end up in Trash
rimrafSync(paths.appDist + '/*');

// Start the babel dist
dist();

// Print out errors
function printErrors(summary, errors) {
  console.log(chalk.red(summary));
  console.log();
  errors.forEach(err => {
    console.log(err.message || err);
    console.log();
  });
}

// Create the production component dist and print the deployment instructions.
function dist() {
  console.log('Creating an optimized production component dist...');

  // exec babel to change src/component out to dist folder
  exec('npm run dist:script', {
    cwd: path.join(__dirname, '..')
  }, function(err, stdout, stderr) {
    if(err) {
      printErrors('Failed to dist.', [err]);
      process.exit(1);
    }
    console.log(stdout);

    modeDistToRoot();

    console.log(chalk.green('Dist successfully.'));
  });
}

function modeDistToRoot() {
  fs.move(path.join(__dirname, '../dist'), path.join(__dirname, '../../../dist'), {clobber: true}, function (err) {
    if (err) return console.error(err);
    console.log('move dist to root success.');
  });
}
