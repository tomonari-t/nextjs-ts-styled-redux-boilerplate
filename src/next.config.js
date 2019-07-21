// next.config.js
const withTypescript = require('@zeit/next-typescript')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const withSass = require('@zeit/next-sass')

module.exports = withTypescript(
  withSass({
    env: {
      // Build-time configuration
    },
    serverRuntimeConfig: {
      // Will only be available on the server side
    },
    publicRuntimeConfig: {
      // Will be available on both server and client
    },
    webpack(config, options) {
      if (options.isServer)
        config.plugins.push(new ForkTsCheckerWebpackPlugin())
      return config
    },
  }),
)
