const compose = require('next-compose');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withOffline = require('next-offline');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require('webpack');
const dev = process.env.NODE_ENV !== 'production';
require('dotenv').config()

const offlineConfig = {
  workboxOpts: {
    swDest: 'service-worker.js',
    clientsClaim: true,
    skipWaiting: true,
    navigateFallbackDenylist: [
      new RegExp('^/_'),
      new RegExp('^\\/api'),
      new RegExp('/[^/]+\\.[^/]+$'),
    ],
    runtimeCaching: [
      {
        urlPattern: '/',
        handler: 'NetworkFirst',
        options: {
          cacheName: 'html-cache'
        },
      },
      {
        urlPattern: /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'image-cache',
          expiration: {
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          },
        },
      },
      {
        urlPattern: /\.(?:js|css)$/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-resources'
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'google-fonts-stylesheets',
        }
      },
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
};

module.exports = compose([
  [withOffline, offlineConfig],
  [withBundleAnalyzer],
  {
    webpack: (config, {defaultLoaders}) => {

      config.plugins.push(
        new webpack.EnvironmentPlugin(process.env)
      );

      config.node = {
        fs: 'empty'
      };

      if (!dev) {
        config.plugins.push(new LodashModuleReplacementPlugin);
        config.plugins.push(new OptimizeCSSAssetsPlugin({}));
      }

      return config
    }
  }
]);
