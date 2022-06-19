module.exports = {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'SkateBnb',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css',
    // SCSS file in the project
    '~/assets/css/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/firebase.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // Simple usage
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module'
  ],
  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL || 'https://skateandbed-aa4d4-default-rtdb.europe-west1.firebasedatabase.app',
      credentials: false
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
    // [
    //   '@nuxtjs/firebase',
    //   {
    //     config: {
    //       apiKey: '<apiKey>',
    //       authDomain: '<authDomain>',
    //       projectId: '<projectId>',
    //       storageBucket: '<storageBucket>',
    //       messagingSenderId: '<messagingSenderId>',
    //       appId: '<appId>',
    //       measurementId: '<measurementId>'
    //     },
    //     services: {
    //       auth: true, // Just as example. Can be any other service.
    //       firestore: true,
    //       functions: true,
    //       storage: true,
    //       database: true,
    //       messaging: true,
    //       performance: true,
    //       analytics: true,
    //       remoteConfig: true
    //     }
    //   }
    // ]
  ],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://skateandbed-aa4d4-default-rtdb.europe-west1.firebasedatabase.app'
    // router: {
    // linkActiveClass: 'active'
    // }
  }
}
