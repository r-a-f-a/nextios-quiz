<template>
  <div class="start-form">
    <h2 class="start-form__title">Insira o código de validação</h2>
    <div class="form-group">
      <input
        type="email"
        class="form-control"
        placeholder="Ex: 2568971123"
        v-model="token"
        required
      >
    </div>
    <button
      class="btn btn-primary"
      @click="validateToken"
    >Validar</button>
    <template v-if="error">
      <div class="error-box">
        <small class="error-msg">* O código informado é inválido</small>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "Validate",
  data () {
    return {
      token: "",
      error: false
    }
  },
  methods: {
    validateToken () {
      //CONSUMIR API
    }
  }
}
</script>

<style>
</style>