<template>
  <div class="image">
    <img :src="pathImage.image" alt="">
  </div>
</template>

<script>
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { onBeforeMount, onMounted, onUpdated, reactive } from '@nuxtjs/composition-api'

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
    const getImageUrl = () => {
      getDownloadURL(ref(storage, `${props.image}`))
        .then((url) => {
          pathImage.image = url
        })
        .catch((error) => {
          console.log(error)
        })
    }

    onMounted(() => {
      getImageUrl()
    })
    onBeforeMount(() => {
      getImageUrl()
    })
    return {
      pathImage
    }
  }
}
</script>

<style lang="scss" scoped>
// .image {
//     width: 100%;
//     height: 100%;
//     position: relative;
// }

</style>
