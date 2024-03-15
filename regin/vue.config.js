const { defineConfig } = require('@vue/cli-service')
const port = 8080;

module.exports = defineConfig({
  transpileDependencies: true
  
},
devServer={
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  host: '0.0.0.0',
  port: port,
  open: true,
  Proxy:{
    '/api':{
      target:'http://localhost:7777',
      changeOrigin:true,
      ws:false,
      pathRewrite:{
        '^/api':''
      }
    },
      css: {
        loaderOptions: {
          less: {
            lessOptions: {
              modifyVars: {
                // 在这里修改 ViewUI 的主题变量
              },
              javascriptEnabled: true,
            },
          },
        },
      },
      presets: [
        '@vue/cli-plugin-babel/preset',
      ],
      // ——————————这里
      // plugins: [
      //   [
      //     'import',
      //     {
      //       'libraryName': 'view-ui-plus',
      //       'libraryDirectory': 'src/components',
      //     },
      //     'view-ui-plus',
      //   ]
      // ],
    
    // '/d': {
    //   target: 'https://d.zhys.com',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/d': '/d'
    //   }
    // }
  },
  disableHostCheck: true
},

)