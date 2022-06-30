<template>
  <div class="posts grid grid-cols-2 gap-4">
    <PostDetail
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
  </div>
</template>

<script>
export default {
  computed: {
    posts () {
      return this.$store.state.posts
    }
  },
  mounted () {
    this.$store.dispatch('getPosts')
  }
}
</script>

<style>

</style>
