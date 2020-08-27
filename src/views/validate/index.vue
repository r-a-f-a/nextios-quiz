<template>
  <div>
      <h1>Validate page </h1>
      <input type="text" placeholder="Token" v-model="token" required>
      <button @click="validateToken">Validar</button>
  </div>
</template>

<script>
export default {
  name: "Validate",
  data () {
    return {
      token: ""
    }
  },
  methods: {
    validateToken() {
      //CONSUMIR API
    }
  }
}
</script>

<style>

</style>