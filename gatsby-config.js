/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  pathPrefix: 'cv/public',
  proxy: {
    prefix: "webpack-runtime",
    url: "http://localhost/cv/public/",
  },
  proxy: {
    prefix: "styles-",
    url: "http://localhost/cv/public/",
  },
}
