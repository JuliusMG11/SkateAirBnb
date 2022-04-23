<template>
    <h2>test ************* {{ loadedPost.content }}</h2>
</template>

<script>
import axios from 'axios'
export default {
    asyncData(context) {
    return axios.get('https://skateandbed-aa4d4-default-rtdb.europe-west1.firebasedatabase.app/posts/' + context.params.id + '.json')
      .then(data => {
          console.log(data)
        return {
          loadedPost: data.data
        }
      })
      .catch(e => context.error(e))
  }
}
</script>
