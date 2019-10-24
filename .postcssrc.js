// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    'precss': {},
    'postcss-calc': {},
    'postcss-pxtorem': {
      // rootValue: 14,
      mediaQuery: true,
      propList: [
        '*'
      ],
    }
  }
}
