module.exports = {
  env: {
    NODE_ENV: '"development"',
    CLIENT_ENV: process.env.CLIENT_ENV,
  },
  defineConstants: {
  },
  weapp: {},
  h5: {
    devServer: {
      // 同一局域网访问
      // host: "0.0.0.0",
      port: 10086,
      proxy: {
        '/api': {
          target: "https://www.v2ex.com",
          changeOrigin: true
        }
      }
    }
  }
}