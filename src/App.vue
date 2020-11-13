<template>
  <div id="app"  :style="{ backgroundImage: 'url(' + image + ')' }">
    <template v-if="image == '/img/home_background.2f3e908f.png'">
      <img class="logo-img" src="../public/img/logo.png" alt=" Logo" >
    </template>
    <router-view></router-view>
    <notifications group="foo" position="bottom right" />
  </div>
</template>
<script>
export default {
  name: "APP",
  data () {
    return {
      background: {
        'home': 'home_background.png',
        'question': 'question.jpg'
      }
    }
  },
  computed:{
    image() {
      let backgroundSelected = this.$route.meta.background || 'home'
      let background = this.background[backgroundSelected]
      return require(`../public/img/${background}`)
    }
  }
}
</script>

<style lang="scss">
.logo-img{
  position: absolute;
  bottom: 30px;
  right: 20px;
  width: 25%;
  height: auto;
}
#app {
  height: 100vh;
  width: 100vw;
  // background-image: url('../public/img/home_background.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media only screen and (max-height: 768px) {
  #app {
    height: 100%!important;
    width:100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    overflow-y: auto;
  }
}
</style>
