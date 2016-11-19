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
require('dotenv').config({ silent: true });

var chalk = require('chalk');
var autoprefixer = require('autoprefixer');
var babel = require('babel-core');
var less = require('less');
var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');
var postcss = require('postcss');
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

// Start the move dist folder
dist();

// Create the production component dist and print the deployment instructions
function dist() {
    console.log('Creating an optimized production component dist...');

    moveFileToDist();
}

// Print out errors
function printErrors(summary, errors) {
    console.log(chalk.red(summary));
    console.log();
    errors.forEach(err => {
        console.log(err.message || err);
        console.log();
    });
}

function moveFileToDist() {
    fse.copy(paths.appComponent, paths.appDist, {
        clobber: true,
        filter: function(file) {
            var ext = path.extname(file);
            var fileName = file.replace(path.dirname(file), '');
            var distFile = path.join(paths.appDist, fileName);
            if (ext === '.js' || ext === '.jsx') { // use babel
                babel.transformFile(file, {}, function(err, result) {
                    if (err) return printErrors('Failed to babel js|jsx file.', [err]);
                    fs.writeFile(distFile, result.code, 'utf8', function(err, data) {
                        if (err) return printErrors('Failed to write ' + distFile + '.', [err]);
                    });
                });
            } else if (file.match(/.less.css$/)) { // use less and autoprefixer
                fs.readFile(file, 'utf8', function(err, data) {
                    if (err) return printErrors('Failed to read file ' + distFile + '.', [err]);
                    less.render(data, {}).then(function(output) {
                        autoprefixerPostcss(output.css, function(result) {
                          fs.writeFile(distFile, result, 'utf8', function(err, data) {
                              if (err) return printErrors('Failed to write ' + distFile + '.', [err]);
                          });
                        });
                    }, function() {
                        printErrors('Failed to transform less file ' + distFile + '.', [err]);
                    });
                });
            } else if (ext === '.css') { // use autoprefixer
                fs.readFile(file, 'utf8', function(err, data) {
                    if (err) return printErrors('Failed to read file ' + distFile + '.', [err]);
                    autoprefixerPostcss(output.css, function(result) {
                      var distCssFile = distFile.replace(/.less$/, '.css');  // change .less to .css
                      fs.writeFile(distCssFile, result, 'utf8', function(err, data) {
                          if (err) return printErrors('Failed to write ' + distFile + '.', [err]);
                      });
                    });
                });
            } else {
              return true;
            }
        }
    }, function(err) {
        if (err) return printErrors('Failed to dist.', [err]);
        console.log('now, your component is ready to be deployed!\n');
        console.log('cd dist && npm publish');
    });
}


function autoprefixerPostcss(css, cb) {
  postcss([autoprefixer({
      browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
      ]
  })])
  .process(css)
  .then(function(result) {
      result.warnings().forEach(function(warn) {
          console.warn(warn.toString());
      });
      cb(result.css);
  });
}