module.exports = {
  css: {
    extract: true,
  },
  devServer: {
    port: 8090,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7002",
        ws: false,
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/api": "/api/v1",
        },
      },
    },
    disableHostCheck: true,
  },
};
