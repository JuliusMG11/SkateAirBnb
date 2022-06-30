<template>
  <div class="ads-container">
    <div class="title">
      <h2>Wanna make your skate <br>trips better?</h2>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.ads-container {
    background-image: url('./assets/img/skateboard-bg.jpg');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position:center;
    position: relative;
    display: block;
    border-radius: 12px;
    height: 140px;
    width: 100%;
    padding-left: 32px;
    padding-right: 32px;
    margin: 16px 0px;
    display: flex;
    align-content: center;
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);

    .title {
        padding-top: 16px;
        padding-bottom: 16px;

        h2 {
            font-size: 42px;
            font-weight: 800;
            color: white;
            line-height: 42px;
        }
    }
}
</style>
