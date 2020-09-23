<template>
<div class="question">
  <div class='left'>
    <div id="question">
      <img :src="imageQuestion"/>
    </div>
  </div>
  <div class='right'>
    <div id="question-title">
      <p>{{ questions[selectedQuestion].title}}</p>
    </div>
    <div id="question-body">
      <!-- <wordSwipe></wordSwipe> -->
      <!-- <drag></drag> -->
      <component :is="questions[selectedQuestion].component"></component>
      <button @click="prev()" class="btn">Voltar</button>
      <button @click="next()" class="btn">Avançar</button>
    </div>
  </div>
</div>
  
</template>

<script>
import wordSwipe from '../wordswipe'
import drag from '../drag'

export default {
  name: "question",
  components: { 
    wordSwipe
    // drag
  },
  methods: {
    prev(){
      if(this.selectedQuestion > 1){
        this.selectedQuestion = this.selectedQuestion - 1
        this.number =  this.selectedQuestion
      }
    },
    next() {
      this.$events.emit('VALIDATE_QUESTION')
    }
  },
  mounted() {
    this.$events.off('TIP_QUESTION')
    this.$events.on('TIP_QUESTION', (tip) => {
      this.$notify({
        group: 'foo',
        type: tip.type,
        title: tip.title,
        text: tip.text
      });
    })
    this.$events.off('ANSWER_QUESTION')
    this.$events.on('ANSWER_QUESTION', (answer) => {
      // CHAMA API MICHEL COM A RESPOSTA RECEBIDA
      console.log(answer)
      if(this.selectedQuestion != Object.keys(this.questions).length){
        this.selectedQuestion = this.selectedQuestion + 1
        this.number =  this.selectedQuestion
      }
    })
  },
  data() {
    return {
      number: '1',
      selectedQuestion: 1,
      questions: {
        1: {
          title: "Relacione as frases com os anos cronológicos abaixo e nos ajude a contar a evolução da marca Nextios.",
          component: drag
        },
        2: {
          title: "Em quais segmentos a Nextios atuará?",
          component: wordSwipe
        }
      }
    }
  },
  computed: {
    imageQuestion(){
      return require(`../../../public/img/question_${("0" + this.number).slice(-2)}.png`)
    }
  },
}
</script>

<style>
#question{
    vertical-align: top;
    /* border: 1px solid black; */
    position: relative;
    width: 60%;
    top: 20%;
    left: 15%;
}
#question img{
  width:100%;
  height:100%;
}

.left{
  display: block;
  height: 100vh;
  width: 40%;
  float:left;
  overflow: hidden;
}


.right{
  float:left;
  display: block;
  height: 100vh;
  width: 60%;
}

#question-title{
  margin-top:40px;
  background-image: url('../../../public/img/faixa_pergunta.png') !important;
  background-position: right;
  background-repeat: no-repeat;
  background-size: cover;
  height: 18%;
  width: 100%;
}
#question-title p{
  margin: 30px;
  margin-left: 7%;
  /* border: 1px solid black; */
  position: absolute;
  font-size: 25px;
  font-weight: bold;
  color: #1e3344;
  text-align: justify;
  height: 12%;
}


#question-body{
  border:1px solid black;
  width: calc(100% - 40px);
  margin:20px 0px;
  height: 72%;
}

</style>
<style scoped>

</style>