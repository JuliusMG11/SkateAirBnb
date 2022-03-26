<template>

    
  <div class="container">

    <div>
      <Logo />
      <h1 class="title">
        SKATEBNB
      </h1>

    </div>

    <the-map />

    <div class="posts">
        <ul class="grid grid-cols-3 gap-4">
          <li v-for="post in posts" :key="post.id">
               <div class="bg-white border rounded-lg overflow-hidden">
                <div class="p-6">
                  <div class="text-gray-600 text-xs uppercase font-semibold tracking-wide">
                    {{ post.title }}
                  </div>
                  <h4 class="font-semibold text-lg leading-tight truncate">{{ post.author }}</h4>
                  <div class="mt-1">
                    {{  post.category }}
                    <span class="text-gray-600 text-sm"></span>
                  </div>
                  <div class="mt-2 flex items-center">
                    <span class="ml-2 text-gray-600 text-sm">{{ post.content }}</span>
                  </div>
                </div>
              </div>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import TheMap from '../components/TheMap.vue'

export default {
  components: {
    TheMap
  },
  data() {
    return {
    //  posts: [],

    }
  },

  /*
  async mounted() {
    axios
      .get('https://skateandbed-aa4d4-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
      .then(response => (this.posts = response.data))
      .catch(e => console.log(e))
  },
  */

 computed: {
   posts() {
    return this.$store.state.posts
    }
   
 },
 mounted() {
    this.$store.dispatch("getPosts");
  }

}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;

  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
