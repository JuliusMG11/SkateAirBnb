<template>
  <div class="container">
    <div class="content-section">
      <div class="toolbar">
        TOOLBAR
      </div>
      <TheAds />
      <PostList />
    </div>
  </div>
</template>

<script>
import PostList from '../components/PostList.vue'
import TheAds from '../components/homepage/TheAds.vue'

export default {
  components: {
    PostList,
    TheAds
  }

}
</script>

<style lang="scss" scoped>

</style>
