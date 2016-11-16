# eslint-config-magic-component

This package includes the shareable ESLint configuration used by [Create Magic Component](https://github.com/magic-FE/create-magic-component).  
Please refer to its documentation:

* [Getting Started](https://github.com/magic-FE/create-magic-component/blob/master/README.md#getting-started) – How to create a new component.
* [User Guide](https://github.com/magic-FE/create-magic-component/blob/master/packages/create-magic-component/README.md) – How to develop components bootstrapped with Create Magic Component.

## Usage in Create Magic Component Projects

The easiest way to use this configuration is with [Create Magic Component](https://github.com/magic-FE/create-magic-component), which includes it by default. **You don’t need to install it separately in Create Magic Component projects.**

## Usage Outside of Create Magic Component

If you want to use this ESLint configuration in a project not built with Create Magic Component, you can install it with following steps.

First, install this package, ESLint and the necessary plugins.

  ```sh
  npm install --save-dev eslint-config-magic-component babel-eslint@7.0.0 eslint@3.8.1 eslint-plugin-flowtype@2.21.0 eslint-plugin-import@2.0.1 eslint-plugin-jsx-a11y@2.2.3 eslint-plugin-react@6.4.1
  ```

Then create a file named `.eslintrc` with following contents in the root folder of your project:

  ```js
  {
    "extends": "react-app"
  }
  ```

  That's it! You can override the settings from `eslint-config-magic-component` by editing the `.eslintrc` file. Learn more about [configuring ESLint](http://eslint.org/docs/user-guide/configuring) on the ESLint website.
