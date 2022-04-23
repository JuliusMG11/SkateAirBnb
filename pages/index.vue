<template>
  <div class="custom-container">
     <div class="content-section">
        <h1 class="title">
        SKATEBNB
      </h1>
      <PostList />
    </div>
    <div class="map-section">
      <TheMap />
    </div>
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

<style lang="scss" scoped>
.custom-container {
  display: flex;
}

.map-section {
  max-width: 50%;
  display: flex;
  flex: 1 auto;
}

.content-section {
  max-width: 50%;
}

</style>
