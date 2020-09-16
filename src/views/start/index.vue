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
      >Iniciar</button>
      <template v-if="error">
        <div class="error-box">
          <small class="error-msg">* Utilize o e-mail corporativo da Locaweb para prosseguir</small>
        </div>
      </template>
      
    </div>
  </div>
</template>

<script>
import jwt from '@allinmkt/jwt'
export default {
  name: 'Start',
  data () {
    return {
      email: "",
      error: false,
    }
  },
  methods: {
     fix(obj){
      for (var property in obj) {
        console.log('PROP', property, obj[property])
          if ( Object.prototype.hasOwnProperty.call(obj,property)) {
              obj[property] = eval("(" + obj[property] + ")");
          }
      }
      return obj
    },
    checkEmail () {
      let validated = this.email.endsWith('@locaweb.com.br')
      if (validated) {
          this.saveUser()
      } else {
        this.error = true
      }
    },
    saveUser(){
      
      return this.$api.call("post", "/users", { email: this.email })
      .then((response) => {
        this.$root.$data.user = response.data.result
        localStorage.setItem('_user', jwt(response.data.result, process.env.VUE_APP_SECRET).generate())
        this.sendVerification(response.data.result.id)
        return response.data
      })
    },
    sendVerification(userId){
      return this.$api.call("post", "/users/verification/send", {  userId })
      .then((response) => {
        console.log('SEND VERIFICATION')
        this.$router.replace('/validate')
        return response.data
      })
    },
  }
}
</script>

<style>


/* body, html {
    background-image: url('../../../public/img/home_background.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
} */
</style>