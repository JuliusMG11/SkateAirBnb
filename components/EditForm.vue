<template>
  <div class="">
    <span v-if="newLocation.lat > 0">Nova Lokacia je:{{ newLocation.addressLabel }} </span>
    <searchLocation
      v-if="newLocation.lat > 0 || loadedPost.lat > 0"
      :lat="newLocation.lat || loadedPost.lat"
      :lng="newLocation.long || loadedPost.long"
      @selectLocation="testLoc"
    />
    MOREE {{ loadedPost.addressLabel }}
    <!-- {{ loadedPost }} -->
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      @submit.prevent="onEdit(
        uid = uid,
        profileId = loadedPost.profileId,
        title = loadedPost.title,
        name = loadedPost.name,
        email = loadedPost.email,
        content = loadedPost.content,
        category = loadedPost.category,
        lat = newLocation.lat || loadedPost.lat,
        long = newLocation.long || loadedPost.long,
        addressLabel = newLocation.addressLabel || loadedPost.addressLabel,
        image = changeImage.image || loadedPost.image
      )"
    >
      <span>{{ JSON.stringify(changeImage.image) }}</span>
      <!-- <span v-if="changeImage.image"> {{ changeImage.image }}</span> -->
      <div class="mb-4">
        <uploadImage :image="loadedPost.image" />
        <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
          Change Image: {{ changeImage.image }}
        </label>
        <input
          id="image"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="file"
          placeholder="image"
          accept="image/*"
          @change="previewImage"
        >
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
          Title
        </label>
        <input
          id="title"
          v-model="loadedPost.title"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
        >
      </div>

      <!-- <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
          Image cover
      </label>
      <input
          id="image"
          ref="fileInput"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="file"
          placeholder="image"
          accept="image/*"
          @change="previewImage"
      >
      <div v-if="post.imageData != null">
          <img class="preview" height="268" width="356" :src="post.image">
          {{ post.image }}
          <br>
      </div>
      </div> -->

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Name
        </label>
        <input
          id="name"
          v-model="loadedPost.name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="name"
        >
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          id="email"
          v-model="loadedPost.email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          placeholder="email"
        >
      </div>

      <div class="mb-4">
        <input id="accomodation" v-model="loadedPost.category" type="checkbox" value="accomodation">
        <label for="accomodation">Accomodation</label>

        <input id="filming" v-model="loadedPost.category" type="checkbox" value="filming">
        <label for="filming">filming</label>

        <input id="spot-guide" v-model="loadedPost.category" type="checkbox" value="spotGuide">
        <label for="spot-guide">Spot guide</label>

        <span>Checked names: {{ loadedPost.category }}</span>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="content">
          Content
        </label>
        <input
          id="content"
          v-model="loadedPost.content"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="textarea"
          rows="3"
          placeholder="content"
        >
      </div>

      <div class="flex items-center justify-between">
        <v-btn
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          SAve
        </v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import { getDatabase, ref, update } from 'firebase/database'
import { reactive, useRoute, onMounted } from '@nuxtjs/composition-api'
import uploadImage from '../components/uploadImage.vue'
import searchLocation from '../components/searchLocation.vue'

export default {
  components: {
    uploadImage,
    searchLocation
  },
  // import: {
  //   searchLocation
  // },
  props: {
    loadedPost: {
      type: Object,
      required: true
    },
    image: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const post = props.loadedPost
    const newLocation = reactive({
      addressLabel: '',
      lat: null,
      long: null
    })

    const getLocation = () => {
      newLocation.addressLabel = props.loadedPost.addressLabel
      newLocation.lat = props.loadedPost.lat
      newLocation.long = props.loadedPost.long
    }

    console.log('Label' + newLocation.addressLabel)

    const testLoc = (item) => {
      newLocation.addressLabel = item.label
      newLocation.lat = item.x
      newLocation.long = item.y
    }

    // const newPost = reactive({
    //   profileId: props.loadedPost.profileId,
    //   title: props.loadedPost.title,
    //   name: props.loadedPost.name
    // })

    const route = useRoute()
    const uid = route.value.params.id

    const onEdit = (uid, profileId, title, email, name, content, category, lat, long, addressLabel, image) => {
      const db = getDatabase()
      // A post entry.
      const postData = {
        // profileId: props.loadedPost.profileId,
        uid,
        profileId,
        title,
        email,
        name,
        content,
        category,
        lat,
        long,
        addressLabel,
        image
      }

      console.log(postData)

      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {}
      // // console.log(postData)
      // // updates['/posts/' + newPostKey] = postData
      updates['/posts/' + uid] = postData

      return update(ref(db), updates)
    }

    const changeImage = reactive({
      image: ''
    })
    const previewImage = (event) => {
      const previewImageData = event.target.files[0]
      changeImage.image = 'image/' + previewImageData.name
      console.log(changeImage.image)
    }

    const oldImage = () => {
      if (changeImage.image) {
        return changeImage.image
      } else {
        changeImage.image = props.loadedPost.image
      }
    }

    oldImage()

    onMounted(() => {
      getLocation()
    })

    return {
      onEdit,
      post,
      uid,
      newLocation,
      testLoc,
      previewImage,
      changeImage,
      oldImage
    }
  }
}
</script>

<style>

</style>
