/* global __dirname, exports */
exports.path = require('path')
exports.APP_DIR = exports.path.resolve(__dirname, 'javascript')

exports.entry = {
  Carousel: exports.APP_DIR + '/Carousel/index.jsx',
  Slide: exports.APP_DIR + '/Slide/index.jsx',
  View: exports.APP_DIR + '/View/index.js',
}
