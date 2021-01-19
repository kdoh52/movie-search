const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
  app.use(createProxyMiddleware("/api", { target: "https://shoppies-movie-search.herokuapp.com/" }));
//   console.log('hi')
};