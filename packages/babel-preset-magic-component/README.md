# babel-preset-magic-component

This package includes the Babel preset used by [Create Magic Component](https://github.com/magic-FE/create-magic-component).  
Please refer to its documentation:

* [Getting Started](https://github.com/magic-FE/create-magic-component/blob/master/README.md#getting-started) – How to create a new component.
* [User Guide](https://github.com/magic-FE/create-magic-component/blob/master/packages/create-magic-component/README.md) – How to develop components bootstrapped with Create Magic Component.

## Usage in Create Magic Component Projects

The easiest way to use this configuration is with [Create Magic Component](https://github.com/magic-FE/create-magic-component), which includes it by default. **You don’t need to install it separately in Create Magic Component projects.**

## Usage Outside of Create Magic Component

If you want to use this Babel preset in a project not built with Create Magic Component, you can install it with following steps.

First, [install Babel](https://babeljs.io/docs/setup/).

Then create a file named `.babelrc` with following contents in the root folder of your project:

  ```js
  {
    "presets": ["react-app"]
  }
  ```
