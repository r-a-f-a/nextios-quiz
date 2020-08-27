<template>
    <div>
      <h1>Initial page </h1>
      <input type="email" placeholder="Email aqui" v-model="email" required>
      <button @click="checkEmail">INVITE</button>
  </div>
</template>

<script>
export default {
  name: 'Start',
  data() {
    return {
      email: ""
    }
  },
  methods: {
    checkEmail() {
       let validated = this.email.endsWith('@locaweb.com.br')
       if (validated) {
        // consome api para enviar email
        console.log("EMAIL ENVIADO COM SUCESSO")
      }else {
        // apresenta erro para o cliente
        console.log("UTILIZE O EMAIL CORPORATIVO DA LOCAWEB PARA PROSSEGUIR")
      }
    }
  }
}
</script>

<style>

</style>