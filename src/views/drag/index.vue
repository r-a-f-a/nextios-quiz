<template>
  <div class="">


    

  <div class='list_2'>
    <div class="myBox container"  v-for="year in years"  :key="year">
      <div class="boxItem">{{year}}</div>
      <div class="boxItem dropzone" data-type="answer" data-dropzone="1"></div>
      
    </div>
  </div>
      <div class="container list_1">
        <div class="dropzone" v-for="(item,index) in list_1" :key='`list_1_${index}`' :data-dropzone="index">
        <div class='box-question item' :class='`answer-${index}`'>
            <span>{{index}}</span>
            <p>{{item}}</p>
        </div>
        </div>
    </div>




    <!-- <div class="container">
      <div class="dropzone draggable-dropzone--occupied"><div class="item">A</div></div>
      <div class="dropzone draggable-dropzone--occupied"><div class="item">B</div></div>
      <div class="dropzone draggable-dropzone--occupied"><div class="item">C</div></div>
    </div>

    <div class="container">
      <div class="dropzone"></div>
      <div class="dropzone"></div>
      <div class="dropzone"></div>
    </div>

    <div class="container">
        <div class="dropzone"></div>
        <div class="dropzone"></div>
        <div class="dropzone"></div>
    </div> -->

  </div>
</template>

<script>
import { Droppable } from '@shopify/draggable'
export default {
 name: "drag",
 mounted () {

  const droppable = new Droppable(document.querySelectorAll('.container'), {
    draggable: '.item',
    dropzone: '.dropzone',
    mirror: {
      constrainDimensions: true,
    }
  });
  let _this = this

  // --- Draggable events --- //
  droppable.on('drag:start', (evt) => {
    _this.droppableOrigin = evt.originalSource.parentNode.dataset.dropzone;
  });

  droppable.on('droppable:dropped', (evt) => {
    console.log('EVT', evt)
    console.log('evt.dropzone', evt.dropzone.dataset.type)
    // if (_this.droppableOrigin !== evt.dropzone.dataset.dropzone) {
    //   evt.cancel();
    // }
  });
  // droppable.on('droppable:dropped', (e) => console.log('droppable:dropped', e));
  // droppable.on('droppable:returned', (e) => console.log('droppable:returned', e));
 },
 data() {
   return {
      droppableOrigin: '',
      list_1: {
        'A' :  "Nasce a Locaweb IDC, uma divisão de negócios da Locaweb, com soluções mais robustas de internet e Data Center.",
        'B' :  "Locaweb IDC inicia uma jornada de reestruturação para atender o mercado corporativo e se torna Locaweb Soluções Corporativas",
        'C' :  "Locaweb Soluções Corporativas passa por um rebranding de marca e muda seu nome para Locaweb Corp",
        'D' :  "Locaweb Corp adquire a Cluster2GO, fruto da fusão entre Ananke, Primehost e ION/NOVA ION e passa a oferecer serviços de nuvem pública e privada.",
        'E' : "Locaweb Corp Cluster2GO inicia uma jornada de evolução, rumo a um futuro tecnológico, eficiente e sustentável e torna-se a Nextios, que vai muito além de serviços de infraestrutura, datacenter e cloud."
      },
      years: ['2003','2014','2017','2018','2020'],
      answer:{}
   }
 }
}
</script>

<style>
.list_1{
  float:left;
  width: 300px;
  height: 500px;
}
.list_1 .dropzone{
    /* border-bottom: 1px dashed #ccc; */
    height: auto;
    min-height: 100px;
}
.list_1 .dropzone:last-child{
  border-bottom:0px !important;
}
.list_2{
  float:left;
}
.list_1 .box-question{
  float:left;
  margin: 10px;
  height: auto;
}
.list_1 .box-question.answer-C{
  clear:both !important;
}

.box-question{
  position: relative;
    display: block;
    background-color: #1e3344;
    height: 125px;
    width: 250px;
}
.box-question span{
    line-height: 20px;
    padding: 8px;
    text-align: center;
    top: 40px;
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
display: block;
    font-size: 13px;
    margin-left: 15px;
    padding: 15px;
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
    border: 1px solid black;
    margin-right: 5em;
    position: relative;
    margin-bottom: 10px;
    height: 125px;
    width: 250px;
    float: left;
}
div.boxItem.dropzone{ 
  border: 1px dashed black !important;
}

div.boxItem:first-child {
    clear: both;
}


.boxItem:before,
.boxItem:after
{
  content:'';
  width:50px;
  border-bottom:2px solid;
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
body {
  text-align:center;
}
  /* .draggable-dropzone--occupied { background: lightgreen; } */
</style>