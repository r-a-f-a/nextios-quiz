<template>
  <div class="start-form">
    <h2 class="start-form__title">Insira o código de validação</h2>
    <span class="tip">O código foi enviado para o email: <b>{{email}}</b></span>
    <div class="form-group">
      <input
        type="text"
        class="form-control code"
        placeholder="Ex: 4VV7XT"
        v-model="code"
        required
      >
    </div>
    <button
      class="btn btn-primary"
      @click="validateCode"
    >Validar</button>

    <span class="back">Caso não seja o seu email <a href="/?newSession=1">Clique aqui</a></span>
    
    <template v-if="error">
      <div class="error-box">
        <small class="error-msg">* O código informado é inválido</small>
      </div>
    </template>
  </div>
</template>

<script>
import jwt from '@allinmkt/jwt'
export default {
  name: "Validate",
  data () {
    return {
      code: "",
      error: false
    }
  },
  created(){
    if(!this.email){
      this.$router.push('/')
    }
    if(this.$route.query.code){
      this.code = this.$route.query.code
    }
  },
  methods: {
    validateCode () {
       return this.$api.call("get", "/users/verification/validate", { userId: this.$root.$data.user.id, code: this.code.toUpperCase() })
      .then((response) => {
        console.log('RESPONSE')
        if(response.data.code === 200){
          localStorage.setItem('_validation', jwt({'validation': response.data.result}, process.env.VUE_APP_SECRET).generate())
          this.$root.$data.validation = response.data.result
          this.$router.push('/intro')
        } else {
          localStorage.removeItem('_validation')
        }
        return response.data
      })
    }
  },
  computed: {
    email () {
      return  this.$root.$data.user ? this.$root.$data.user.email : false
    }
  }
}
</script>

<style>
.code {
  text-transform: uppercase;
}
span.tip {
  font-size: 12px;
    text-align: center;
    margin-top: -10px;
    position: relative;
    top: -10px;
    width: 100%;
    display: block;
    color: #64e4ab;
}
span.back {
  font-size: 12px;
    margin-top: 30px;
    display: block;
    color: white;
}
span.back a{
   color: #64e4ab;
}

</style>