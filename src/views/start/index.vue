<template>
  <div class="flex-container">
    <div class="start-form">
      <h2 class="start-form__title">Informe o seu e-mail corporativo</h2>
      <div class="form-group">
        <input
          type="email"
          class="form-control"
          placeholder="nome.sobrenome@locaweb.com.br"
          v-model="email"
          required
        >
      </div>
      <button
        class="btn btn-primary"
        @click="checkEmail"
      >Cadastrar</button>
      <template v-if="error">
        <div class="error-box">
          <small class="error-msg">* Utilize o e-mail corporativo da Locaweb para prosseguir</small>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Start',
  data () {
    return {
      email: "",
      error: false
    }
  },
  methods: {
    checkEmail () {
      let validated = this.email.endsWith('@locaweb.com.br')
      if (validated) {
        this.$api.call("post", "/users", { email: this.email })
          .then((response) => {
            console.log("REPONSE", response)
          })
      } else {
        this.error = true
      }
    }
  }
}
</script>

<style>
</style>