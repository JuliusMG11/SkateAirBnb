<template>
  <div class="container">
    <div class="header grid grid-cols-2 items-center">
      <nuxt-link to="/">
        <logo />
      </nuxt-link>
      <div class="navigation">
        <ul class="flex justify-end items-center">
          <li class="mr-6">
            <nuxt-link to="/">
              Home
            </nuxt-link>
          </li>
          <li class="mr-6">
            <nuxt-link to="/posts">
              All
            </nuxt-link>
          </li>
          <li class="mr-6">
            <nuxt-link to="/admin">
              Admin
            </nuxt-link>
          </li>
          <li v-if="!user" class="mr-6">
            <nuxt-link to="/login">
              Login
            </nuxt-link>
          </li>
          <li v-if="!user" class="mr-6">
            <nuxt-link to="/registration">
              registration
            </nuxt-link>
          </li>
          <li v-if="user" class="mr-6">
            <a @click="signOut">Sign Out</a>
          </li>
          <li v-if="user" class="mr-6">
            <div class="profile-image">
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

import Logo from '../../components/navigation/Logo.vue'

export default {
  components: {
    Logo
  },
  data () {
    return {
      user: ''
    }
  },
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user
    })
  },
  methods: {
    signOut () {
      firebase.auth().signOut().then((result) => {
        this.user = ''
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin-top: 22px;
  margin-bottom: 22px;
}

.profile-image {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #a6a6a6
}
.navigation li {
    font-size: 16px;
    font-weight: 600;
}
</style>
