<template>
  <div class="question">
    <div class="left">
      <div id="question">
        <img :src="imageQuestion" />
      </div>
    </div>
    <div class="right">
      <div id="question-title">
        <p>{{ questions[selectedQuestion].title }}</p>
      </div>
      <div id="question-body">
        <component
          :is="questions[selectedQuestion].component"
          :configs="questions[selectedQuestion].configs"
        ></component>
        <!-- <button @click="prev()" class="btn">Voltar</button> -->
        <div class="footer">
          <button @click="next()" class="btn">Avançar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wordSwipe from '../wordswipe'
import drag from '../drag'
import options from '../options'
import complete from '../complete'
import lug from '../lug'

export default {
  name: "question",
  methods: {
    // prev(){
    //   if(this.selectedQuestion > 1){
    //     this.selectedQuestion = this.selectedQuestion - 1
    //     this.number =  this.selectedQuestion
    //   }
    // },
    next() {
      this.$events.emit("VALIDATE_QUESTION");
    },
  },
  mounted() {
    this.$events.off("TIP_QUESTION");
    this.$events.on("TIP_QUESTION", (tip) => {
      this.$notify({
        group: "foo",
        type: tip.type,
        title: tip.title,
        text: tip.text,
      });
    });
    this.$events.off("ANSWER_QUESTION");
    this.$events.on("ANSWER_QUESTION", (answer) => {
      // CHAMA API MICHEL COM A RESPOSTA RECEBIDA
      console.log(answer);
      if (this.selectedQuestion != Object.keys(this.questions).length) {
        this.selectedQuestion = this.selectedQuestion + 1;
        this.number = this.selectedQuestion;
      }
    });
  },
  data() {
    return {
      number: "1",
      selectedQuestion: 6,
      questions: {
        1: {
          title: "Em quais segmentos a Nextios atuará?",
          component: wordSwipe,
        },
        2: {
          title:
            "Relacione as frases com os anos cronológicos abaixo e nos ajude a contar a evolução da marca Nextios.",
          component: drag,
        },
        3: {
          title: "Como está estruturado o portifólio de serviços da Nextios?",
          component: options,
          configs: {
            chooseLimit: 1,
            options: [
              "Serviços, Serviços de Infraestrutura, Soluções de Negócios e APM",
              "Serviços, E-commerce, Marketing Digital e APM",
              "Serviços de Infraestrutura e AWS",
              "AWS e Serviços de Infraestrutura",
            ],
          },
        },
        4: {
          title:
            "Qual o nosso grau de parceria com a AWS e quais competências que temos?",
          component: options,
          configs: {
            chooseLimit: 3,
            options: [
              "Parceiro Advanced, com competências MSP - Managed Service Provider e Storage",
              "Parceiro Premier, com competências MSP e Storage",
              "Parceiro Advanced, com competências Well-Architected e MSP - Managed Service Provider",
            ],
          },
        },
        5: {
          title: "Qual é o propósito da Nextios?",
          component: complete,
          configs: {
            words: [
              "prosperar",
              "transformação digital",
              "empoderar",
              "negócios",
              "e",
              "ao",
              "empresas",
              "pessoas",
              "através",
              "por meio",
              "da",
              "de",
              "do",
              "tecnologia",
              "mercado",
              "parceiros",
              "serviços",
              "soluções",
              "aws",
              "sistemas",
              "data center",
              "excelência",
              "qualidade",
              "código fonte",
              "infraestrutura",
            ],
          },
        },
        6: {
          title: "Complete as frases que definem os 4 pilares da cultura Nextios",
          component: lug,
          configs: {
            options: ['parceiros na tecnologia','desenvolvemos','nosso código fonte','melhor solução'],
            phrases: [
              [
                {
                  value: 'Pessoas são',
                  dragabble: false
                },
                {
                  value: '',
                  draggable: true
                },
                {
                  value: '.',
                  draggable: false
                }
              ],
              [
                {
                  value: '',
                  draggable: true
                },
                {
                  value: ', companheiros reais.',
                  draggable: false
                }
              ],
              [
                {
                  value: '',
                  draggable: true
                },
                {
                  value: 'um futuro melhor.',
                  draggable: false
                }
              ],
              [
                {
                  value: 'Focados na',
                  draggable: false
                },
                {
                  value: '',
                  draggable: true
                },
                {
                  value: '.',
                  draggable: false
                }
              ]
            ]
          }
        }
      }
    };
  },
  computed: {
    imageQuestion() {
      return require(`../../../public/img/question_${("0" + this.number).slice(
        -2
      )}.png`);
    },
  },
};
</script>

<style>
.btn {
  background-color: #1e3344;
  color: #fff;
}

#question {
  vertical-align: top;
  /* border: 1px solid black; */
  position: relative;
  width: 60%;
  top: 20%;
  left: 15%;
}
#question img {
  width: 100%;
  height: 100%;
}

.footer {
  position: absolute;
  margin-top: 32%;
  margin-left: 41%;
}

.left {
  display: block;
  height: 100vh;
  width: 40%;
  float: left;
  overflow: hidden;
}

.right {
  float: left;
  display: block;
  height: 100vh;
  width: 60%;
}

#question-title {
  margin-top: 40px;
  background-image: url("../../../public/img/faixa_pergunta.png") !important;
  background-position: right;
  background-repeat: no-repeat;
  background-size: cover;
  height: 18%;
  width: 100%;
}
#question-title p {
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

#question-body {
  /* border:1px solid black; */
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 10px 0px;
  height: 72%;
}
</style>
<style scoped></style>
