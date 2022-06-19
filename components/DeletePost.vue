<template>
  <div class="">
    <p>urcite chcete delete MORE</p>
    {{ post }}
    <v-btn @click="deletePost">
      ozaj delete
    </v-btn>
    TOTO JE IMAGE {{ post.image }}
  </div>
</template>

<script>
import { getDatabase, ref, remove } from 'firebase/database'
import { getStorage, ref as sRef, deleteObject } from 'firebase/storage'
import { reactive, useRoute } from '@nuxtjs/composition-api'

export default {
  props: {
    post: {
      type: Object,
      required: true
    },
    postId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const route = useRoute()
    const uid = route.value.params.id
    const db = getDatabase()
    const storage = getStorage()
    const postImage = reactive({
      image: ''
    })


    // DELETE POST
    const deletePost = () => {
      confirm('Naozaj chcete vymazat vasu lokaciu ?')
      // DELETE POST IMAGE STORAGE
    //   const desertRef = sRef(storage, `${props.post.image}`)
    //   console.log(desertRef)
      if (confirm) {
        console.log('***********delete***********')
        // Delete the file
        // deleteObject(desertRef).then(() => {
        // // File deleted successfully
        //   console.log('DELETE' + desertRef)
        // }).catch((error) => {
        // // Uh-oh, an error occurred!
        //   console.log(error)
        // })

        // DELETE POST DATA REAILTIME DB
        const postData = {
          profileId: props.post.profileId,
          title: props.post.title,
          name: props.post.name,
          email: props.post.email,
          addressLabel: props.post.addressLabel,
          lat: props.post.lat,
          long: props.post.long,
          category: props.post.category,
          content: props.post.content,
          image: `image/${props.post.image}`
        }

        console.log(postData)

        remove(ref(db, 'posts/' + uid), {
          profileId: props.post.profileId,
          title: props.post.title,
          name: props.post.name,
          email: props.post.email,
          addressLabel: props.post.addressLabel,
          lat: props.post.lat,
          long: props.post.long,
          category: props.post.category,
          content: props.post.content,
          image: `${props.post.image}`
        })
          .then(() => {
            // Data saved successfully!
            console.log('DELETE')
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        alert('MORE NEVYSLO, SKUS ESTE RAZ')
      }
    }
    return {
      deletePost,
      postImage
    }
  }
}
</script>

<style>

</style>
