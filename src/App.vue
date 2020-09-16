<template>
  <div id="app"  :style="{ backgroundImage: 'url(' + image + ')' }">
    <router-view></router-view>
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
      let backgroundSelected = this.$route.meta.background || 'question'
      let background = this.background[backgroundSelected]
      return require(`../public/img/${background}`)
    }
  }
}
</script>

<style lang="scss">
#app {
    height: 100%;
    width:100%;
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
</style>
