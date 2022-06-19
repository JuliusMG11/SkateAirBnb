import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _960847da = () => interopDefault(import('../pages/account/index.vue' /* webpackChunkName: "pages/account/index" */))
const _2eb5cd16 = () => interopDefault(import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */))
const _3aefa5e2 = () => interopDefault(import('../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */))
const _9598860e = () => interopDefault(import('../pages/posts/index.vue' /* webpackChunkName: "pages/posts/index" */))
const _177c2c69 = () => interopDefault(import('../pages/registration/index.vue' /* webpackChunkName: "pages/registration/index" */))
const _7cf89938 = () => interopDefault(import('../pages/posts/_id/index.vue' /* webpackChunkName: "pages/posts/_id/index" */))
const _0a46dc75 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _960847da,
    name: "account"
  }, {
    path: "/admin",
    component: _2eb5cd16,
    name: "admin"
  }, {
    path: "/login",
    component: _3aefa5e2,
    name: "login"
  }, {
    path: "/posts",
    component: _9598860e,
    name: "posts"
  }, {
    path: "/registration",
    component: _177c2c69,
    name: "registration"
  }, {
    path: "/posts/:id",
    component: _7cf89938,
    name: "posts-id"
  }, {
    path: "/",
    component: _0a46dc75,
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
