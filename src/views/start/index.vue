<template>
<div>
   <h1>Initial page </h1>
   <input type="email" placeholder="Email aqui" v-model="email" required>
   <button v-if="!pass">INVITE</button>
  </div>
</template>

<script>
export default {
  name: 'Start',
  data () {
    return {
      email: '',
      pass: false,
      secrete: ''
    }
  },
  methods: {}
}
</script>

<style>

</style>