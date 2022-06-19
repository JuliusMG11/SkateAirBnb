<template>
  <v-container>
    <v-card>
      <!-- {{ loadedPost }} -->
      <!-- <span>{{ loadedPost.category }}</span> -->
      <span>{{ loadedPost.post.name }}</span>
      <h2>{{ loadedPost.post.title }}</h2>
      <p>{{ loadedPost.post.content }}</p>
      {{ loadedPost.post.image }}
      <v-btn @click="changeActivePopup()">
        EDIT
      </v-btn>
      <v-btn @click="openDeletePopup">
        DELETE
      </v-btn>
      <div class="edit-popup" :class="{ active: activePopup }">
        <EditForm :loadedPost="loadedPost.post" :image="loadedPost.post.image" />
      </div>
      <div class="delete-popup" :class="{ active: deletePopup}">
        <DeletePost :post="loadedPost.post" :postId="id" />
      </div>
    </v-card>
  </v-container>
</template>

<script>
// import { getDatabase, update } from 'firebase/database'
import axios from 'axios'
import { ref, onMounted, useRoute, computed, reactive } from '@nuxtjs/composition-api'
import EditForm from '../../../components/EditForm.vue'
import DeletePost from '../../../components/DeletePost.vue'

export default {
  components: {
    EditForm,
    DeletePost
  },
  setup () {
    const loadedPost = reactive({
      post: {}
    })
    const route = useRoute()
    const id = computed(() => route.value.params.id)
    const asyncData = async (context) => {
      await axios.get('https://skateandbed-aa4d4-default-rtdb.europe-west1.firebasedatabase.app/posts/' + id.value + '.json')
        .then((data) => {
        // console.log(data)
          loadedPost.post = data.data
          // return {
          //   loadedPost: data.data
          // }
          // console.log(loadedPost)
        })
        .catch(e => context.error(e))
    }
    // }
    const activePopup = ref(false)
    const deletePopup = ref(false)
    const changeActivePopup = () => {
      activePopup.value = !activePopup.value
    }
    const openDeletePopup = () => {
      deletePopup.value = !deletePopup.value
    }

    onMounted(() => {
      asyncData()
    })

    return {
      activePopup,
      changeActivePopup,
      loadedPost,
      openDeletePopup,
      deletePopup,
      id
    }
  }
  // asyncData (context) {
  //   return axios.get('https://skateandbed-aa4d4-default-rtdb.europe-west1.firebasedatabase.app/posts/' + context.params.id + '.json')
  //     .then((data) => {
  //       // console.log(data)
  //       return {
  //         loadedPost: data.data
  //       }
  //     })
  //     .catch(e => context.error(e))
  // }
}
</script>

<style lang="scss" scoped>
  .edit-popup,
  .delete-popup  {
    background: white;
    padding: 22px;
    position: absolute;
    margin: 0 auto;
    display: none;

    &.active {
      display: block;
    }
  }
</style>
