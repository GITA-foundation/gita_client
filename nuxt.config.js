module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:1337',
    gitaShort: 'GITA',
    gitaLong: 'Global ICO Transparency Alliance'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'GITA - Global ICO Transparency Alliance',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Global ICO Transparency Alliance' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons' }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js' },
      // { src: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js' },
      { src: '/js/bootstrap-material-design.min.js' },
      // { src: '/js/bootstrap-selectpicker.js' },
      // { src: '/js/bootstrap-datetimepicker.js' },
      { src: '/js/material-kit.min.js?v=2.1.0' }
    ]
  },
  css: [
    '@/assets/scss/material-kit.scss',
    '@/assets/scss/global.scss'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    ['bootstrap-vue/nuxt', { css: false }],
    '@nuxtjs/font-awesome',
  ],
  build: {
    vendor: ['axios']
  },
  router: {
    middleware: ['checkAuth']
  },
  plugins: [
    '~plugins/persistedstate.js'
  ]
}
