<template>
  <!-- <div class="flex-card card">
    <h1>Página Inicial</h1>
    <component :is="setComponent" :config="currentComponent.config"></component>
    <button type="button" class="btn btn-primary" @click="prevStep">Voltar</button>
    <button type="button" class="btn btn-primary" @click="nextStep">Avançar</button>
  </div> -->
  <div class="flex-puzzle">
    <div class="step">
      <h2>Questão</h2>
      <h1>01</h1>
    </div>
    <div class="question">
      <component
        :is="setComponent"
        :config="currentComponent.config"
      ></component>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'Steps',
  data () {
    return {
      currentComponent: '',
      questionList: [],
      componentList: [{
        type: 'choices',
        config: {
          question: "Em qual ano a Nextios foi criada ?",
          data: {
            a: "1920",
            b: "500 a.c",
            c: "2077",
            d: "1996",
            e: "2018"
          },
          answers: ["a", "c"],
          htmlCode: `<div><p>{{config.question}}</p><ul><li v-for="(option, index) in config.data" :key="index">{{option}}</li></ul></div>`
        }
      }, {
        type: 'labels',
        config: {
          question: "Preencha as lacunas com as alternativas abaixo",
          data: ["foo", "bar"],
          answers: {
            _foo_: "Foo",
            _bar_: "Bar"
          },
          htmlCode: `<div class="teste"><p>{{config.question}}</p><ul><li v-for="(option, index) in config.data" :key="index">{{option}}</li></ul></div>`
        }
      }, {
        type: 'choices',
        config: {
          question: "Quais as metodologias de negócios usada pela Nextios",
          data: {
            a: "SCRUM",
            b: "Babybeef",
            c: "um dia serei hokage",
            d: "Agil",
            e: "Bagaceira"
          },
          answers: ["a", "c"],
          htmlCode: `<div><p>{{config.question}}</p><ul><li v-for="(option, index) in config.data" :key="index">{{option}}</li></ul></div>`
        }
      }]
    }
  },
  created () {
    this.initComponent()
    // this.getQuestions()
    this.step(0)
  },
  methods: {
    getQuestions () {
      this.$api.call("get", "/questions")
        .then((response) => {
          this.questionList = response.data
        })
    },
    initComponent () {
      let total = this.componentList.length
      for (let i = 0; i < total; i++) {
        const comp = this.componentList[i];
        Vue.component(comp.type, {
          props: ['config'],
          template: comp.config.htmlCode
        })

      }
    },
    step (newIndex) {
      this.currentComponent = {
        index: newIndex,
        config: this.componentList[newIndex].config,
        type: this.componentList[newIndex].type
      }
    },
    prevStep () {
      let newIndex = this.currentComponent.index > 1 ? this.currentComponent.index - 1 : 0
      this.step(newIndex)
    },
    nextStep () {
      let total = this.componentList.length
      let newIndex = this.currentComponent.index < total ? this.currentComponent.index + 1 : total
      this.step(newIndex)
    }
  },
  computed: {
    setComponent: function () {
      return this.currentComponent.type
    }
  }
}
</script>

<style>
</style>