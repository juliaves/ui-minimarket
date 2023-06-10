const PROXY_CONFIG = [
  {
    "context": [
      "/api/products",
      "/api/purchases"
    ],
    "target": "http://localhost:8085/",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true
  }];
module.exports = PROXY_CONFIG;