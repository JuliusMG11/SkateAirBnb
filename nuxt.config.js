
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css',
    // SCSS file in the project
    { src: '~/assets/scss/main.scss', lang: 'sass' }
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/_variables.scss"`
        }
      }
    }
  },

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
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
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
  styleResources: {
    css: ['./assets/scss/main.scss']
  },
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
