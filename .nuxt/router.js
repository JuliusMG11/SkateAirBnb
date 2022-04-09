import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _243c0c24 = () => interopDefault(import('..\\pages\\account\\index.vue' /* webpackChunkName: "pages/account/index" */))
const _28c8c0fc = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _2e1aff28 = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages/login/index" */))
const _9e3d2704 = () => interopDefault(import('..\\pages\\posts\\index.vue' /* webpackChunkName: "pages/posts/index" */))
const _fb07812c = () => interopDefault(import('..\\pages\\registration\\index.vue' /* webpackChunkName: "pages/registration/index" */))
const _0655c103 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _243c0c24,
    name: "account"
  }, {
    path: "/admin",
    component: _28c8c0fc,
    name: "admin"
  }, {
    path: "/login",
    component: _2e1aff28,
    name: "login"
  }, {
    path: "/posts",
    component: _9e3d2704,
    name: "posts"
  }, {
    path: "/registration",
    component: _fb07812c,
    name: "registration"
  }, {
    path: "/",
    component: _0655c103,
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
