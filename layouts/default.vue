<template>
  <div>
    <ul class="flex">
      <li class="mr-6">
        <nuxt-link to="/">
          Home
        </nuxt-link>
      </li>
      <li class="mr-6">
        <nuxt-link to="/posts">
          All Posts
        </nuxt-link>
      </li>
      <li class="mr-6">
        <nuxt-link to="/admin">
          Admin
        </nuxt-link>
      </li>
      <li class="mr-6">
        <nuxt-link v-if="!user" to="/login">
          Login
        </nuxt-link>
      </li>
      <li class="mr-6">
        <nuxt-link v-if="!user" to="/registration">
          registration
        </nuxt-link>
      </li>
      <li class="mr-6">
        <a v-if="user" @click="signOut">Sign Out</a>
      </li>
    </ul>
    <Nuxt />
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

export default {
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

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
