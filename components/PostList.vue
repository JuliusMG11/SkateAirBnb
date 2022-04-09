<template>
  <div class="posts grid grid-cols-3 gap-4">
    <v-card
    v-for="post in posts"
    :key="post.id"
    class="mx-auto my-12"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">{{ post.author }}</div>
          <div class="text-overline mb-4">{{  post.category }}</div>
        <v-list-item-title class="text-h5 mb-1">
        {{ post.title }}
     </v-list-item-title>
        <v-list-item-subtitle>{{ post.content }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
      >
        Button
      </v-btn>
    </v-card-actions>
  </v-card>
  </div>
</template>

<script>
export default {
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

</style>