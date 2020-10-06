<template>
  <div class="start-form">
   <h1 class="title">Parabéns !!</h1>
    <span class="span-text">
     <p class="p-intro">Você demorou 1:32h para finalizar o desafio.</p>
     <p class="p-intro">Seu score foi 8.9 de 10.0.</p>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Finished'
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
 text-align: center;
}
.center{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn{
  background-color: #64e4ab;
  border-color:#64e4ab;
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  margin-top: 15px;
  text-shadow: 1px 1px #000000cc;
}
</style>