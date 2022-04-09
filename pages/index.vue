<template>

    
  <div class="container">

    <div>
      <h1 class="title">
        SKATEBNB
      </h1>

    </div>
     <TheMap />
      <PostList />
  </div>
</template>

<script>
import TheMap from '../components/TheMap.vue'
import PostList from '../components/PostList.vue'

export default {
  components: {
    TheMap,
    PostList
  },
  data() {
    return {

    }
  },
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

</style>
