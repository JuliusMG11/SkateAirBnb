<template>
  <div class="add-post-page container">
    <div class="map-container">
      <test :lat="post.lng" :lng="post.lat" @selectLocation="testLoc" />
      {{ post.addressLabel }}
    </div>
    <div class="form-section">
      <form
        class=""
        @submit.prevent="onSubmit"
      >
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
            Title
          </label>
          <input
            id="title"
            v-model="post.title"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="title"
          >
        </div>

        <div class="mb-4">
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
            <!-- {{ post.image }} -->
            <br>
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Name
          </label>
          <input
            id="name"
            v-model="post.name"
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
            v-model="post.email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="email"
          >
        </div>

        <div class="mb-4">
          <input id="accomodation" v-model="post.category" type="checkbox" value="accomodation">
          <label for="accomodation">Accomodation</label>

          <input id="filming" v-model="post.category" type="checkbox" value="filming">
          <label for="filming">Filming</label>

          <input id="spot-guide" v-model="post.category" type="checkbox" value="spotGuide">
          <label for="spot-guide">Spotguide</label>

          <span>Checked names: {{ post.category }}</span>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="content">
            Content
          </label>
          <input
            id="content"
            v-model="post.content"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="textarea"
            rows="3"
            placeholder="content"
          >
        </div>

        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            SAve
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import { db } from 'firebase/firebase'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
// import { doc, setDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { reactive } from '@nuxtjs/composition-api'
// import firebase from 'firebase/compat/app'
import test from '../../components/Test.vue'

export default {
  components: {
    test
  },
  setup () {
    const placeholderLocation = reactive({
      label: '',
      lat: 50.073658,
      lng: 14.418540
    })
    const testLoc = (item) => {
      console.log('MOOREE' + item)
      post.addressLabel = item.label
      post.lat = item.x
      post.lng = item.y

      console.log('MORE' + post.label)
    }
    // let uid = ref('')
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        post.profileId = user.uid
        // console.log(uid)
      } else {
        console.log('LOOGOUT IS')
      }
    })
    // const db = firebase.firestore()
    const post = reactive({
      profileId: '',
      title: '',
      name: '',
      email: '',
      addressLabel: '',
      lat: 50.073658,
      lng: 14.418540,
      category: [],
      content: '',
      image: '',
      imageData: null
    })
    const onSubmit = () => {
      const newPost = reactive({
        profileId: post.profileId,
        title: post.title,
        name: post.name,
        email: post.email,
        addressLabel: post.addressLabel,
        lat: post.lat,
        long: post.lng,
        category: post.category,
        content: post.content,
        image: `image/${post.imageData.name}`
      })
      console.log(newPost)
      onUpload()
      axios
        .post('https://skateandbed-aa4d4-default-rtdb.europe-west1.firebasedatabase.app/posts.json', newPost)
        .then(result => console.log(result))
        .catch(e => console.log(e))
    }

    const previewImage = (event) => {
      post.imageData = event.target.files[0]
    }

    const onUpload = () => {
      post.image = null
      const storage = getStorage()
      const storageRef = ref(storage, `image/${post.imageData.name}`)

      uploadBytes(storageRef, post.imageData).then((snapshot) => {
        console.log('Uploaded a blob or file!')
      })

      // storageRef.on( `state_changed`, snapshot => () => {
      //   this.uploadValue = 100
      //   storageRef.snapshot.ref.getDownloadURL().then((url) => {
      //     this.post.image = url
      //     console.log(this.post.image)
      //   })
      // })
    }
    return {
      onSubmit,
      post,
      previewImage,
      onUpload,
      testLoc,
      placeholderLocation
    }
  }
}
</script>

<style lang="scss" scoped>

.map-container {
  padding: 0px 32px;
}

.form-section {
  padding: 0px 32px;
}

</style>
