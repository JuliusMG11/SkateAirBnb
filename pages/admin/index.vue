<template>
  <div class="add-post-page container">
    <div class="form-section relative">
      <div class="error-message" :class="{ active: errorActive }">
        <div class="header flex pb-2">
          <h4 class="font-bold">
            Errors
          </h4>
          <div class="close-icon" @click="errorClose">
            <img src="~/assets/img/icons/close.svg" alt="">
          </div>
        </div>
        <div class="error-content">
          <ul v-for="item in errors.error" :key="item.id">
            <li class="flex">
              <div class="error-icon">
                <img src="~/assets/img/icons/close.svg" alt="">
              </div>
              <span class="bold">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
      <form
        class="add-form"
        @submit.prevent="onSubmit"
      >
        <div class="mb-4">
          <label class="font-bold mb-2" for="title">
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
        <div class="map-container">
          <span class="mt-4 mb-4 font-bold">Select your address</span>
          <searchLocation :lat="post.lng" :lng="post.lat" @selectLocation="newLocation" />
          <!-- <span class="mt-4 fw-700">Select location:</span>
          {{ post.addressLabel }} -->
        </div>
        <div class="grid gap-4 grid-cols-2 mt-4">
          <div class="">
            <label class="font-bold mb-2" for="name">
              Name
            </label>
            <input
              id="name"
              v-model="post.name"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Johny Derep.."
            >
          </div>
          <div class="">
            <label class="font-bold mb-2" for="name">
              Instagram account
            </label>
            <input
              id="name"
              v-model="post.instagram"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="account name"
            >
          </div>
        </div>

        <div class="select-image mt-8">
          <span class="font-bold">
            Image cover
          </span>
          <div class="mb-4 flex">
            <div class="custom-input" :style="{'background-color': preview ? preview : preview }">
              <input
                class="input"
                type="file"
                placeholder="image"
                accept="image/*"
                @change="previewImage"
              >
              <div class="icon">
                <img src="~/assets/img/icons/upload.svg" alt="">
              </div>
            </div>
            <div v-if="preview" class="preview">
              <img
                :src="preview"
              >
              <br>
            </div>
          </div>
        </div>
        <span class="text-sm font-bold mb-2">
          Select your category
        </span>
        <div class="mb-4 flex">
          <div class="category-toggle flex">
            <label class="toggler-wrapper style-1 mr-2" for="accomodation">
              <input id="accomodation" v-model="post.category" type="checkbox" value="accomodation" @change="getSelectCategory">
              <div class="toggler-slider">
                <div class="toggler-knob"></div>
              </div>
            </label>
            <span class="font-bold">Accomodation</span>
          </div>

          <div class="category-toggle flex">
            <label class="toggler-wrapper style-1 mr-2" for="filming">
              <input id="filming" v-model="post.category" type="checkbox" value="filming" @change="getSelectCategory">
              <div class="toggler-slider">
                <div class="toggler-knob"></div>
              </div>
            </label>
            <span class="font-bold">Filming</span>
          </div>

          <div class="category-toggle flex">
            <label class="toggler-wrapper style-1 mr-2" for="spotguide">
              <input id="spotguide" v-model="post.category" type="checkbox" value="spotguide" @change="getSelectCategory">
              <div class="toggler-slider">
                <div class="toggler-knob"></div>
              </div>
            </label>
            <span class="font-bold">Spotguide</span>
          </div>
        </div>

        <span class="text-sm font-bold mb-2">
          What can you help to find ?
        </span>
        <div class="mb-4 flex">
          <div class="category-toggle flex">
            <label class="toggler-wrapper style-1 mr-2" for="spots">
              <input id="spots" v-model="post.helpFind" type="checkbox" value="spots">
              <div class="toggler-slider">
                <div class="toggler-knob"></div>
              </div>
            </label>
            <span class="font-bold">Spots</span>
          </div>

          <div class="category-toggle flex">
            <label class="toggler-wrapper style-1 mr-2" for="pubs">
              <input id="pubs" v-model="post.helpFind" type="checkbox" value="pubs">
              <div class="toggler-slider">
                <div class="toggler-knob"></div>
              </div>
            </label>
            <span class="font-bold">Pubs</span>
          </div>

          <div class="category-toggle flex">
            <label class="toggler-wrapper style-1 mr-2" for="shops">
              <input id="shops" v-model="post.helpFind" type="checkbox" value="shops">
              <div class="toggler-slider">
                <div class="toggler-knob"></div>
              </div>
            </label>
            <span class="font-bold">Shops</span>
          </div>
          <div class="category-toggle flex">
            <label class="toggler-wrapper style-1 mr-2" for="diy">
              <input id="diy" v-model="post.helpFind" type="checkbox" value="diy">
              <div class="toggler-slider">
                <div class="toggler-knob"></div>
              </div>
            </label>
            <span class="font-bold">DIY</span>
          </div>
        </div>
        <span class="text-sm font-bold">
          What do you skate most ?
        </span>
        <div class="mb-4 flex">
          <div class="category-toggle flex">
            <label class="toggler-wrapper style-1 mr-2" for="skateparks">
              <input id="skateparks" v-model="post.skateMost" type="checkbox" value="skateparks">
              <div class="toggler-slider">
                <div class="toggler-knob"></div>
              </div>
            </label>
            <span class="font-bold">Skateparks</span>
          </div>

          <div class="category-toggle flex">
            <label class="toggler-wrapper style-1 mr-2" for="street">
              <input id="street" v-model="post.skateMost" type="checkbox" value="street">
              <div class="toggler-slider">
                <div class="toggler-knob"></div>
              </div>
            </label>
            <span class="font-bold">Street</span>
          </div>

          <div class="category-toggle flex">
            <label class="toggler-wrapper style-1 mr-2" for="bowl">
              <input id="bowl" v-model="post.skateMost" type="checkbox" value="bowl">
              <div class="toggler-slider">
                <div class="toggler-knob"></div>
              </div>
            </label>
            <span class="font-bold">Bowl</span>
          </div>
          <div class="category-toggle flex">
            <label class="toggler-wrapper style-1 mr-2" for="diy">
              <input id="diy" v-model="post.skateMost" type="checkbox" value="diy">
              <div class="toggler-slider">
                <div class="toggler-knob"></div>
              </div>
            </label>
            <span class="font-bold">DIY</span>
          </div>
        </div>

        <div class="mb-4 mt-8">
          <label class="font-bold" for="content">
            Tell you something
          </label>
          <textarea
            id="content"
            v-model="post.content"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="textarea"
            rows="3"
            placeholder="content..."
          />
        </div>

        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Post location
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { reactive, ref as refs, useRouter } from '@nuxtjs/composition-api'
import searchLocation from '../../components/searchLocation.vue'

export default {
  components: {
    searchLocation
  },
  setup () {
    const router = useRouter
    const errors = reactive({
      error: []
    })

    const placeholderLocation = reactive({
      label: '',
      lat: 50.073658,
      lng: 14.418540
    })
    const newLocation = (item) => {
      post.addressLabel = item.label
      post.lat = item.x
      post.lng = item.y
    }
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        post.profileId = user.uid
        post.email = user.email
      } else {
        console.log('LOOGOUT IS')
      }
    })
    const post = reactive({
      profileId: '',
      title: '',
      name: '',
      instagram: '',
      email: '',
      addressLabel: '',
      lat: 50.073658,
      lng: 14.418540,
      category: [],
      helpFind: [],
      skateMost: [],
      content: '',
      image: '',
      imageData: null
    })

    const errorActive = refs(false)
    const errorClose = () => {
      errorActive.value = !errorActive.value
    }

    const onSubmit = () => {
      const newPost = reactive({
        profileId: post.profileId,
        title: post.title,
        name: post.name,
        instagram: post.instagram,
        email: post.email,
        addressLabel: post.addressLabel,
        lat: post.lat,
        long: post.lng,
        category: post.category,
        helpFind: post.helpFind,
        skateMost: post.skateMost,
        content: post.content,
        image: `image/${post.imageData.name}` && ''
      })

      // *********** CHECKED INPUTS *********//
      if (!newPost.title) {
        errors.error.push('Title required.')
        errorActive.value = true
      }
      if (!newPost.name) {
        errors.error.push('Name required.')
        errorActive.value = true
        setTimeout(() => {
          errorActive.value = false
        }, 5000)
      }
      if (!newPost.addressLabel) {
        errors.error.push('Address required.')
        errorActive.value = true
      }

      if (newPost.name && newPost.title && newPost.addressLabel) {
        console.log('CHECKED')
        // onUpload()
        // axios
        //   .post('https://skateandbed-aa4d4-default-rtdb.europe-west1.firebasedatabase.app/posts.json', newPost)
        //   .then(result => console.log(result))
        //   .catch(e => console.log(e))
        // router.push('/')
      }
    }

    const setPreview = refs(false)
    const preview = refs(null)
    const previewImage = async (event) => {
      post.imageData = await event.target.files[0]
      const input = event.target
      if (input) {
        const reader = new FileReader()
        reader.onload = (e) => {
          preview.value = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
    }

    const onUpload = () => {
      post.image = null
      const storage = getStorage()
      const storageRef = ref(storage, `image/${post.imageData.name}`)

      uploadBytes(storageRef, post.imageData).then((snapshot) => {
        console.log('Uploaded a blob or file!')
      })
    }

    const getSelectCategory = (event) => {
      post.category = []
      if (event.target.checked) {
        post.category.push(event.target.value)
      }
    }

    return {
      onSubmit,
      post,
      previewImage,
      onUpload,
      newLocation,
      placeholderLocation,
      preview,
      setPreview,
      getSelectCategory,
      errors,
      errorActive,
      errorClose
    }
  }
}
</script>

<style lang="scss" scoped>

.form-section {
  padding: 0px 32px;
}

.toggler-wrapper.style-1 input[type="checkbox"]:checked+.toggler-slider .toggler-knob {
  left: calc(100% - 19px - 3px);
}

.toggler-wrapper.style-1 .toggler-knob {
    width: calc(25px - 6px);
    height: calc(25px - 6px);
    border-radius: 50%;
    left: 3px;
    top: 3px;
    background-color: #fff;
}

.toggler-wrapper {
    display: block;
    width: 45px;
    height: 25px;
    cursor: pointer;
    position: relative;
}

.toggler-wrapper input[type="checkbox"] {
  display: none;
}

.toggler-wrapper input[type="checkbox"]:checked+.toggler-slider {
  background-color: #44cc66;
}

.toggler-wrapper .toggler-slider {
    background-color: #ccc;
    position: absolute;
    border-radius: 100px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-transition: all 300ms ease;
    transition: all 300ms ease;
}

.toggler-wrapper .toggler-knob {
    position: absolute;
    -webkit-transition: all 300ms ease;
    transition: all 300ms ease;
}

.custom-input {
  position: relative;
  margin-right: 8px;
  width: 40px;
  height: 40px;
  border: solid 2px blue;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  .input {
    position: absolute;
    left: 0px;
    top: 0px;
    opacity: 0;
    width: 100%;
    height: 100%;

    &:hover {
      cursor: pointer;
    }
  }

  .icon{
    width: 22px;
    height: 22px;
  }
}

.select-image {
  .preview {
    position: relative;
    max-width: 220px;

    img {
      border-radius: 12px;
    }
  }
}

.error-message {
  position: absolute;
  right: 16px;
  background: #E76268;
  color: white;
  padding: 24px;
  z-index: 20;
  display: none;
  border-radius: 12px;

  &.active {
    display: block;
  }

  .close-icon {
    position: relative;
    text-align: right;
    width: 22px;
    height: 22px;
  }

  .header {
    justify-content: space-between;
    border-bottom: 2px solid rgba(255, 255, 255, 0.435);
  }

  .error-content {
    padding-top: 8px;

    li {
      display: flex;
      align-items: center;
    }

    .error-icon {
      width: 16px;
      height: 16px;
      margin-right: 4px;
      padding: 4px;
      background: #A8474C;
      border-radius: 50%;
    }
  }
}
</style>
