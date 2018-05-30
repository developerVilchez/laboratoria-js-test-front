module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'JS Teacher Test',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=EDGE' },
      { 'http-equiv': 'content-type', content: 'text/html; charset=utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'autor', content: 'Luis Espinoza' },
      { name: 'publisher', content: 'espinozasenior@gmail.com' },
      { name: 'copyright', content: 'espinozasenior@gmail.com' },
      { property: 'og:type', content: 'website' },
      { name: 'theme-color', content: '#2b5797' },
      { 'http-equiv': 'ImageResize', content: 'no' },
      { 'http-equiv': 'ImageToolbar', content: 'no' },
      { 'http-equiv': 'Pragma', content: 'no-cache' },
      { 'http-equiv': 'Expires', content: '-1' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:400,600,700,800,900' }
    ],
    css: [
      'normalize.css',
      'assets/css/main.css',
      'sweetalert2/dist/sweetalert2.min.css'
    ],
    js: [
      'classlist.js'
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#ffe521' },
  loadingIndicator: {
    name: 'pulse',
    color: '#ffe521',
    background: 'white'
  },
  mode: 'spa',
  router: {
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-active',
    middleware: ['background'],
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    vendor: ['axios'],
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
  {
    src: '~plugins/vee-validate', ssr: false
  },
  {
    src: '~plugins/vuex-persistedstate.js', ssr: false
  }],
  modules: [
    '@nuxtjs/font-awesome'
  ]
}
