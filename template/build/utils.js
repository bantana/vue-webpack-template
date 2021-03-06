'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin'){{#if_eq projectType "lib"}}
const toPascalCase = require('to-pascal-case'){{/if_eq}}
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

exports.scriptLoaders = function(options) {
  options = options || {}
  return {
    js: {loader: 'babel-loader', options: options.js}{{#if_eq compiler "typescript"}},
    ts: [
      {
        loader: 'babel-loader',
        options: options.js
      },
      {
        loader: 'ts-loader',
        options: options.ts,
      }
    ]{{/if_eq}}
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

{{#if_eq projectType "lib"}}
function externalObject(dependency) {
    return {
      root: toPascalCase(dependency),
      amd: dependency,
      commonjs: dependency,
      commonjs2: dependency
    }
}

// Generate externals object from dependencies
exports.buildExternalsFromDependencies = function() {
  const packageJson = require('../package.json');
  const externals = {};

  for (const dependency in packageJson.dependencies) {
    externals[dependency] = externalObject(dependency);
  }
  for (const dependency in packageJson.peerDependencies) {
    externals[dependency] = externalObject(dependency);
  }
  for (const dependency in packageJson.devDependencies) {
    externals[dependency] = externalObject(dependency);
  }

  return externals;
}
{{/if_eq}}
