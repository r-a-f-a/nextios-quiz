<template>
  <div class="start-form">
   <h1 class="title">Introdução</h1>
   <span class="span-text">
     <p class="p-intro">Em junho, a Locaweb Corp Cluster2Go abraçou a evolução e se tornou a Nextios. Com a nova marca, reforçamos pilares importantes da história da unidade, que ganhou mais protagonismo e foco ao unir a força e solidez da Locaweb com a eficiência e versatilidade que o mercado demanda. </p>
     <p class="p-intro">Relembre a trajetória e pilares da marca nos nossos canais de comunicação e venha testar seus conhecimentos sobre a Nextios.  Lembrando que vale uma Alexa! *</p>
     <p class="p-intro">*Ao participar você está concordando com o regulamento da ação, disponível aqui.</p>
    </span>
    <div class="center">
      <button class="btn" @click="start()">COMEÇAR</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Intro',
  methods: {
    start() {
      this.$router.replace('/questions')
    }
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
}

.span-text{
 color: #fff;
 text-shadow: 2px 2px #000000cc;
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