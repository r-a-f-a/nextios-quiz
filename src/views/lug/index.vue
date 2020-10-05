<template>
  <div class="select">
    <div class="container phrases">
      <div class="option">
        <ol class="options-list">
          <li class="option-item" v-for="(phrase, index) in configs.phrases" :key='`phrases-${index}`' >
            <span class="option-index">{{ letters[index] }}</span>
            <span 
              class="span-word"
              v-for="(word, i) in phrase" 
              :key='`word-${i}`'
              :data-awnser="word.value"
              :data-phrase="index"
              :data-word="i"
              :class="{ 'dropzone line': word.draggable, 'upper' : i === 0}"
            > 
              {{ word.draggable ? "" : word.value }}
            </span>
          </li>
        </ol>
      </div>
    </div>
    <div class="container initial-zone">
      <div class="list-words dropzone">
        <div class="item" v-for="(item, index) in configs.options" :data-option="index" :key='`list-${index}`'>
          <span class="item-word">{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Droppable } from '@shopify/draggable'

export default {
 name: 'Select',
 props: ['configs'],
 mounted() {
   let _this = this
   this.$events.off("VALIDATE_QUESTION");
   this.$events.on("VALIDATE_QUESTION", () => {
    this.validate();
   });
   this.$off('DRAG_ANSWER')
   this.$on('DRAG_ANSWER', (payload) => {
      // console.log('DRG_ANSWER', payload)
      Object.keys(payload.answer).forEach((key) => {
        if(!_this.answer[payload.phrase]) _this.answer[payload.phrase] = {}
        _this.answer[payload.phrase][key] = payload.answer[key]
      })
   })
   const droppable = new Droppable(document.querySelectorAll('.container'), {
    draggable: '.item',
    dropzone: '.dropzone',
    mirror: {
      constrainDimensions: true,
    }
  })
  droppable.on('droppable:stop', (evt) => {
    let phrase = evt.dropzone.dataset.phrase // DROPZONE
    let word = evt.dropzone.dataset.word // DROPZONE
    let answer = evt.dragEvent.source.dataset.option // ITEM
    _this.$emit('DRAG_ANSWER', {phrase, answer: _this.processPhrase(phrase, word, answer)})
  });
 },
 data() {
  return{
    letters: ["A", "B", "C", "D", "E", "F", "G", "H"],
    answer: {},
    mappingOpt: {},
    tip: {
      type: "error",
      title: "Ops!",
      text: "Preencha todas as palavras para continuar."
    }
  }
 },
 methods: {
    processPhrase (phraseIndex, wordIndex, optionIndex) {
      // A: PALAVRA __________ .
      // A: PALAVRA __________ TEST _______.
      // A: [0]: 
        // console.log(phraseIndex)
        // let phrase = this.configs.phrases[phraseIndex]
        let result = {}
        if(this.mappingOpt[optionIndex]) {
          this.$delete(this.answer[this.mappingOpt[optionIndex].phraseIndex], this.mappingOpt[optionIndex].wordIndex)
          if(Object.keys(this.answer[this.mappingOpt[optionIndex].phraseIndex]).length === 0) {
            this.$delete(this.answer,this.mappingOpt[optionIndex].phraseIndex)
          }
        }
        this.mappingOpt[optionIndex] = {
          phraseIndex,
          wordIndex
        }
        // phrase[wordIndex].value = this.configs.options[optionIndex]
        result[wordIndex] = this.configs.options[optionIndex]
        // let result = []
        // phrase.forEach(element => {
        //    result.push(element.value)
        // });
        return result
    },
    validate() {
      this.$events.emit("ANSWER_QUESTION", this.answer)
      // if( Object.keys(this.answer).length === this.configs.options.length){
      //   console.log('OK')
      //   this.$events.emit("ANSWER_QUESTION", this.answer)
      // }else{
      //   this.$events.emit('TIP_QUESTION', this.tip)
      // }
    } 
 },
 created(){
   this.$events.emit('INIT_QUESTIONS', )
 }
}
</script>

<style scoped>
.select{
  width: 100%;
  display: flex;
  flex-direction: column;
}

.container{
  display: flex;
}
.option{
  display: flex;
  width: 100%;
  min-width: 500px;
}

.options-list {
  list-style-type: none;
  width: 73%;
  margin: auto;
}

.option-item {
  margin: 25px 0;
  max-width: 90%;
  display: flex;
}

.span-word{
  margin-left: 5px;
  color: #fff;
  font-size: 26px;
}

.upper::first-letter{
  text-transform: uppercase;
}

.item-word{
  color: #1e3344;
  font-size: 26px;
}

.select{
  display: flex;
}

.item{
  text-align: center;
}

.dropzone{
  display: block;
  min-width: 60px;
  min-height: 26px;
  cursor: pointer;
}

.option-index {
  font-size: 30px;
  font-weight: bold;
  color: #1e3344;
  border-bottom: 4px solid #41e4aa;
  max-height: 40px;
  margin: 0 15px;
}

.line{
  min-width: 250px;
  border-bottom: 4px solid #1e3344;
}
.list-words{
  /* border: 2px solid #000; */
  display: grid;
  border-radius: 5px;
  grid-template-columns: 250px 250px;
  align-items: center;
  grid-column-gap: 10px;
  grid-row-gap: 16px;
  padding: 10px;
}
.initial-zone{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>