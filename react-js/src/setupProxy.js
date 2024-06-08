const { createProxyMiddleware } = require("https-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://localhost:8080",
      changeOrigin: true,
    })
  );
};
