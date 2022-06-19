<template>
  <v-card>
    <v-list-item three-line>
      <nuxt-link :to="postLink">
        <v-list-item-content>
          <div class="text-overline mb-4">
            {{ author }}
          </div>
          <div class="text-overline mb-4">
            {{ category }}
          </div>
          <v-list-item-title class="text-h5 mb-1">
            {{ title }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ content }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar
          tile
          size="80"
          color="grey"
        />
      </nuxt-link>
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
</template>

<script>

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    category: {
      type: Array,
      required: true
    }
  },
  computed: {
    postLink () {
      return '/posts/' + this.id
    }
  }
}
</script>
