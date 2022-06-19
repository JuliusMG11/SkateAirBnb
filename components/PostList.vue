<template>
  <div class="posts grid grid-cols-2 gap-4">
    <PostDetail
      v-for="post in posts"
      :id="post.id"
      :key="post.id"
      :title="post.title"
      :author="post.name"
      :category="post.category"
      :content="post.content"
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
