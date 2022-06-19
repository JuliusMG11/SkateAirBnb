<template>
  <div class="">TEST {{ image }}
    <div class="image">
      <img :src="pathImage.image" alt="">
    </div>
  </div>
</template>

<script>
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { onUpdated, reactive } from '@nuxtjs/composition-api'

export default {
  props: {
    image: String
  },
  setup (props) {
    const storage = getStorage()
    const pathImage = reactive({
      image: ''
    })

    // GET IMAGE FROM POST ID
    const testFunction = () => {
      getDownloadURL(ref(storage, `${props.image}`))
        .then((url) => {
          console.log('**********' + url)
          pathImage.image = url
        })
        .catch((error) => {
          console.log(error)
        })
    }

    // testFunction()

    onUpdated(() => {
      testFunction()
    })
    return {
      pathImage
    }
  }
}
</script>

<style lang="scss" scoped>
.image {
    width: 200px;
    height: 200px;
    position: relative;
}

.image img {
    max-width: 100%;
}


</style>
