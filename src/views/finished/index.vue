<template>
  <div class="start-form">
   <h1 class="title">Parabéns!!!</h1>
    <span class="span-text">
     <p class="p-intro">Você demorou {{ convertMinute }} para finalizar o desafio.</p>
     <p class="p-intro">Seu score foi {{ result }} de 10.</p>
    </span>
  </div>
</template>

<script>
import jwt from '@allinmkt/jwt'
export default {
  name: 'Finished',
  data() {
    return {
      user: '',
      convert: '',
      result: 0
    }
  },
  methods: {
    getUser() {
      var user = localStorage.getItem("_user")
      this.user = jwt(user, process.env.VUE_APP_SECRET).verify()
    },
    getResponse() {
      let payload = {
        userId: this.user.id,
      }
      this.$api.call("get", "/results", payload)
      .then( (response) => {
        this.convert= response.data.result.duration
        this.result = response.data.result.hits.length
      })
    }
  },
  computed:{ 
    convertMinute(with_seg = true){
      let hours = Math.floor( this.convert / 3600 );
      let minutes = Math.floor( (this.convert % 3600) / 60 );
      let seconds = this.convert % 60;
        
      minutes = minutes < 10 ? '0' + minutes : minutes;      
      seconds = seconds < 10 ? '0' + seconds : seconds;
      hours = hours < 10 ? '0' + hours : hours;
        
      if(with_seg){
        return  hours + ":" + minutes + ":" + parseFloat(seconds).toFixed(0);
      }
      return  hours + ":" + minutes;
    }
  },
  created() {
    this.getUser()
    this.getResponse()
  }
}
</script>

<style scoped>
.start-form{
 max-width: 540px;
 top: 16%;
 padding: 54px 50px 54px 50px;
}

.title{ 
  text-align: center;
  color: #64e4ab;
  margin-bottom: 15px;
}

.p-intro{
  margin-bottom: 14px;
  font-size: 38px;
}

.span-text{
 color: #fff;
 text-shadow: 2px 2px #000000cc;
 text-align: left;
}

</style>