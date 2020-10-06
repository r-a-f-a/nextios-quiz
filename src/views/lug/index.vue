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
      if(payload.phrase){
        Object.keys(payload.answer).forEach((key) => {
          if(!_this.answerOpt[payload.phrase]) _this.$set(_this.answerOpt,payload.phrase, {})
          _this.answerOpt[payload.phrase][key] = payload.answer[key]
        })
      }
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
    _this.$emit('DRAG_ANSWER', { phrase, answer: _this.processPhrase(phrase, word, answer)})
  });
 },
 data() {
  return {
    letters: ["A", "B", "C", "D", "E", "F", "G", "H"],
    answerOpt: {},
    mappingOpt: {},
    tip: {
      type: "error",
      title: "Ops!",
      text: "Preencha todas as palavras para continuar.",
    },
  }
 },
 computed : {
   answer () {
    let result = {}
    Object.keys(this.answerOpt).forEach((phrase) => {
      result[phrase] = this.makePhrase(phrase)
    })
     return result
   }
 },
 methods: {
  makePhrase(index){
    let phrase = Object.values(this.configs.phrases[index])
    Object.keys(this.answerOpt[index]).forEach((key) => {
        let element = this.answerOpt[index][key]
        phrase[key].value = element
    })
    return phrase.map(function(word){ return word.value; }).join(" ").replace(' ,',',').replace(' .','.').toLowerCase()
  },
  processPhrase (phraseIndex, wordIndex, optionIndex) {
    let result = {}
    let mapping  = this.mappingOpt[optionIndex]
    if(mapping) {
      this.$delete(this.answerOpt[mapping.phraseIndex], mapping.wordIndex)
      if(Object.keys(this.answerOpt[this.mappingOpt[optionIndex].phraseIndex]).length === 0) {
        this.$delete(this.answerOpt,this.mappingOpt[optionIndex].phraseIndex)
      }
      this.$delete(this.mappingOpt, optionIndex)
    }
    if(phraseIndex && wordIndex){
      this.mappingOpt[optionIndex] = {
        phraseIndex,
        wordIndex
      }
    }
    result[wordIndex] = this.configs.options[optionIndex]
    return result
  },
  validate() {
    if(Object.keys(this.mappingOpt).length == this.configs.options.length){
      this.$events.emit('QUESTION_ANSWERED', { question: this.configs.question, response: this.answer } )
    } else {
      this.$events.emit("TIP_QUESTION", this.tip);
    }
  }
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
  width: 84%;
  margin: auto;
}

.option-item {
  margin: 25px 0;
  max-width: 90%;
  display: flex;
  flex-wrap: wrap;
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
  border: 2px solid #000;
  display: grid;
  border-radius: 5px;
  grid-template-columns: 250px 250px;
  align-items: center;
  grid-column-gap: 10px;
  grid-row-gap: 16px;
  padding: 10px;
}
.list-words .item {
  border: 1px solid #000;
}
.initial-zone{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>