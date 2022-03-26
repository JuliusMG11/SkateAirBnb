import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1c2bb064 = () => interopDefault(import('..\\pages\\account\\index.vue' /* webpackChunkName: "pages/account/index" */))
const _badec4a8 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _35e0055c = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages/login/index" */))
const _67d66aa8 = () => interopDefault(import('..\\pages\\posts\\index.vue' /* webpackChunkName: "pages/posts/index" */))
const _467ede00 = () => interopDefault(import('..\\pages\\registration\\index.vue' /* webpackChunkName: "pages/registration/index" */))
const _50a803ce = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/account",
    component: _1c2bb064,
    name: "account"
  }, {
    path: "/admin",
    component: _badec4a8,
    name: "admin"
  }, {
    path: "/login",
    component: _35e0055c,
    name: "login"
  }, {
    path: "/posts",
    component: _67d66aa8,
    name: "posts"
  }, {
    path: "/registration",
    component: _467ede00,
    name: "registration"
  }, {
    path: "/",
    component: _50a803ce,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
