<template>
<div class="question">
  <div class='left'>
    <div id="question">
      <img :src="imageQuestion"/>
    </div>
  </div>
  <div class='right'>
    <div id="question-title">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?</p>
    </div>
    <div id="question-body">
      <!-- <wordSwipe></wordSwipe> -->
      <!-- <drag></drag> -->
      <component :is="questions[selectedQuestion].component"></component>
      <prev></prev>
      <next></next>
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
  mounted() {
    
    // FLUXO 
    //  COMPONENT  > EVT VALIDATE (ENV NEXT - COMP. PAI) > EVT ANSWER (COMP. PAI)

    this.$off('ANSWER_QUESTION')
    this.$on('ANSWER_QUESTION', (answer) => {
      console.log(answer)
      // CHAMA API MICHEL COM A RESPOSTA RECEBIDA
      // PAYLOAD = ANWSER +  SELECTED_QUESTION {}
      // NEXT
    })
  },
  data() {
    return {
      number: '2',
      selectedQuestion: 1,
      questions: {
        1: {
          title: "",
          component: drag
        },
        2: {
          title: "",
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
#app {
  /* background-image: url('../../../public/img/question.jpg') !important; */
}
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
  border: 1px solid black;
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