<template>
  <div class="logo flex items-center">
    <div class="image">
      <img src="~/assets/img/logo.png" alt="logo">
    </div>
    <div class="content">
      <span class="title">Ask Local</span><br>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.logo {
  .image {
    width: 32px;
    height: 32px;
  }
  .title {
    font-size: 26px;
    font-weight: 700;
  }
  .text {
    font-size: 10px;
    text-transform: uppercase;
  }
}
</style>
