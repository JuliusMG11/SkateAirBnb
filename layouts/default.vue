<template>
  <div class="custom-layout">
    <div class="main">
      <div class="navigation">
        <TheNavigation />
      </div>
      <Nuxt />
    </div>
    <div class="map">
      <TheMap />
    </div>
  </div>
</template>

<script>
import TheNavigation from '../components/navigation/TheNavigation.vue'
import TheMap from '../components/TheMap.vue'

export default {
  components: {
    TheNavigation,
    TheMap
  }
}

</script>

<style lang="scss" scoped>
html {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.custom-layout {
  display: flex;
  height: 100vh;
}

.map {
  width: 50%;
  display: flex;
  flex: 1 auto;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
