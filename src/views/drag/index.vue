<template>
  <div class="drag">
    <div class='timeline'>
      <div class="myBox container"  v-for="year in years"  :key="year">
        <div class="boxItem">
          <span class='year'>{{year}}</span>
        </div>
        <div class="boxItem dropzone" data-type="answer" :data-year="year"></div>
      </div>
    </div>
    <div class="container timeline-answer">
      <div class="dropzone" v-for="(item,index) in questions" :key='`list_1_${index}`'>
        <div class='box-question item' :class='`answer-${index}`'  :data-answer="index">
            <span>{{index}}</span>
            <p>{{item}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Droppable } from '@shopify/draggable'
export default {
 name: "drag",
 created() {
  // this.$events.emit("QUESTION_STARTED", this.question)
 },
 mounted() {
  this.$events.emit("QUESTION_STARTED", this.question)
  let _this = this
  this.$events.off('VALIDATE_QUESTION')
  this.$events.on('VALIDATE_QUESTION', () => {
    this.validate()
  })
  this.$off('DRAG_ANSWER')
  this.$on('DRAG_ANSWER', (payload) => {
    console.log('RESET SELECTED WORD', payload.answer)
    Object.keys(_this.answer).find((key) => {  
      if(_this.answer[key] ===  payload.answer){
        _this.$delete(_this.answer, key)
      }
    })
    console.log('HAVE YEAR', _this.years.indexOf(payload.year))
    if(_this.years.indexOf(payload.year) >= 0){
      this.answer[payload.year] = payload.answer
      console.log('THIS', this.answer)
    }
  })

  const droppable = new Droppable(document.querySelectorAll('.container'), {
    draggable: '.item',
    dropzone: '.dropzone',
    mirror: {
      constrainDimensions: true,
    }
  });
  

  // droppable.on('drag:start', (evt) => {
  //   _this.droppableOrigin = evt
  // });

  droppable.on('droppable:stop', (evt) => {
    console.log('EVT', evt)
    let year = evt.dropzone.dataset.year
    let answer = evt.dragEvent.source.dataset.answer
    _this.$emit('DRAG_ANSWER', {year, answer})
  });
  // droppable.on('droppable:stop', (e) => console.log('droppable:stop', e));
  // droppable.on('droppable:returned', (e) => console.log('droppable:returned', e));
 },
 methods: {
   validate(){
    if(Object.keys(this.answer).length === 5){
      this.$events.emit('QUESTION_ANSWERED', { question: this.question, response: this.answer } ) 
    } else {
      this.$events.emit('TIP_QUESTION', this.tip)
    }
   }
 },
 data() {
   return {
    question: 1,
    droppableOrigin: '',
    tip: {
      type: "error",
      title: "Ops!",
      text: "Preencha todos os campos para continuar."
    },
    questions: {
      'A' :  "Nasce a Locaweb IDC, uma divisão de negócios da Locaweb, com soluções mais robustas de internet e Data Center.",
      'B' :  "Locaweb IDC inicia uma jornada de reestruturação para atender o mercado corporativo e se torna Locaweb Soluções Corporativas",
      'C' :  "Locaweb Soluções Corporativas passa por um rebranding de marca e muda seu nome para Locaweb Corp",
      'D' :  "Locaweb Corp adquire a Cluster2GO, fruto da fusão entre Ananke, Primehost e ION/NOVA ION e passa a oferecer serviços de nuvem pública e privada.",
      'E' : "Locaweb Corp Cluster2GO inicia uma jornada de evolução, rumo a um futuro tecnológico, eficiente e sustentável e torna-se a Nextios, que vai muito além de serviços de infraestrutura, datacenter e cloud."
    },
    years: ['2003','2014','2017','2018','2020'],
    answer: {}
   }
 }
}
</script>

<style scoped>
@media only screen and (max-height: 768px) {
  .boxItem{
    /* display: block; */
    border: 2px solid #1e3344;
    margin-right: 3em!important;
    position: relative;
    margin-bottom: 15px!important;
    height: 80px!important;
    width: 220px!important;
    float: left;
  }
}

.boxItem .year{
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently */
  color: #4fe4ab;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  padding: 10px;
  display: block;
  text-shadow: 2px 2px #1e3344;
}

.timeline-answer{
  float:left;
  width: 220px;
}
.timeline-answer .dropzone{
  height: auto;
}
.timeline-answer .dropzone:last-child{
  border-bottom:0px !important;
}
.timeline{
  float:left;
}
.timeline-answer .box-question{
  float:left;
  margin-bottom: 10px;
}
.timeline-answer .box-question.answer-C{
  clear:both !important;
}

.box-question{
  position: relative;
    display: block;
    background-color: #1e3344;
    height: 90px;
    width: 220px;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently */
}
.box-question span{
    line-height: 20px;
    padding: 8px;
    text-align: center;
    top: 30%;
    left: -25px;
    position: absolute;
    border: 2px solid #1e3344;
    border-radius: 100%;
    width: 40px;
    height: 40px;
    font-size: 16px;
    font-weight: bold;
    background-color: #4fe4ab;
}

.box-question p{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 13px;
    padding: 11px;
    color: white;
    text-align: center;
    line-height: 15px;
}

.drg{
  border:1px solid black;
  height: 50px !important;
  width: 50px !important;
}

div.boxItem { 
    display: block;
    border: 2px solid #1e3344 ;
    margin-right: 5em;
    position: relative;
    margin-bottom: 10px;
    height: 90px;
    width: 220px;
    float: left;
}
div.boxItem.dropzone{ 
  border: 2px dashed #1e3344 !important;
  margin-right: 40px;
}

div.boxItem:first-child {
    clear: both;
}


.boxItem:before,
.boxItem:after
{
  content:'';
  width:50px;
  border-bottom:2px solid #1e3344;
  position:absolute;
  top:50%;

}
:after {
  left:100%;
}
:before {
  right:100%;
}
.boxItem:first-of-type:before,
.boxItem:last-of-type:after {
  display:none;
}

</style>