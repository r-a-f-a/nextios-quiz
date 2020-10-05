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
import jwt from '@allinmkt/jwt'

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
    getUser() {
      var user = localStorage.getItem("_user")
      this.user = jwt(user, process.env.VUE_APP_SECRET).verify()
    }
  },
  mounted() {
    this.getUser()
    this.$events.off("TIP_QUESTION");
    this.$events.on("TIP_QUESTION", (tip) => {
      this.$notify({
        group: "foo",
        type: tip.type,
        title: tip.title,
        text: tip.text,
      });
    });
    this.$events.off("QUESTION_STARTED")
    this.$events.on("QUESTION_STARTED", (question) => {
      let payload = {
        userId: this.user.id,
        type: "QUESTION_STARTED",
        data: {
          property: question
        }
      }
      this.$api.call("post", "/events", payload)
    })
    this.$events.off("QUESTION_ANSWERED");
    this.$events.on("QUESTION_ANSWERED", (answer) => {
      let payload = {
        userId: this.user.id,
        type: "QUESTION_ANSWERED",
        data: answer
      }
      this.$api.call("post", "/events", payload)
      .then(() => {
        if (this.selectedQuestion != Object.keys(this.questions).length) {
          this.selectedQuestion = this.selectedQuestion + 1;
          this.number = this.selectedQuestion;
        }
      })
      .catch( (error) => {
        console.log(error)
      })
    });
  },
  data() {
    return {
      number: "1",
      selectedQuestion: 6,
      user: {},
      questions: {
        1: {
          title:
            "Relacione as frases com os anos cronológicos abaixo e nos ajude a contar a evolução da marca Nextios.",
          component: drag,
        },
        2: {
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
        3: {
          title: "Qual o foco da Nextios em serviços de computação em nuvem?",
          component: lug,
          configs: {
            options: ["cloud pública", "cloud privada/datacenter híbrido"],
            phrases: [
              [
                {
                  value: 'AWS como',
                  draggable: false
                },
                {
                  value: '',
                  draggable: true
                },
                {
                  value: 'VMWARE (antigo ED) como',
                  draggable: false
                },
                {
                  value: '',
                  draggable: true
                },
              ]
            ]
          }
        },
        4: {
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
        },
        5: {
          title: "Em quais segmentos a Nextios atuará?",
          component: wordSwipe,
        },
        6: {
          title: "Como a Nextios quer ser percebida no mercado? Selecione todas as corretas.",
          component: options,
          configs: {
            chooseLimit: 4,
            options: [
              "Atendimento de Excelência",
              "Inteligência agregada à capacidade de execução",
              "Tecnologia é meio, solução é o fim",
              "Papel de construtores"
            ]
          }
        },
        7: {
          title: "Por que uma nova marca? (selecione as duas opções que melhor de aplicam)",
          component: options,
          configs: {
            chooseLimit: 2,
            options: [
              "Além de uma nova marca, somos uma nova unidade de negócios com posicionamento, processos internos e portfólio de apresentação. A nova marca facilita a representação da nossa transformação para o mercado.",
              "Oferta é muito diferente do varejo",
              "A associação com a Locaweb era mal vista pelo mercado ",
              "Para termos novidade para contar para o mercado brasileiro",
              "Parceiro Advanced, com competências Well-Architected e MSP - Managed Service Provider"
            ]
          }
        },
        8: {
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
        9: {
          title: "Qual a visão da Nextios? Complete a frase.",
          component: lug,
          configs: {
            options: ['reconhecidos pelo mercado', 'tecnologia', 'provedor de soluções', 'gerenciados'],
            phrases: [
              [
                {
                  value: 'Seremos',
                  draggable: false
                },
                {
                  value: '',
                  draggable: true
                },
                {
                  value: 'Parceiros e profissionais de',
                  draggable: false
                },
                {
                  value: '',
                  draggable: true
                },
                {
                  value: 'como o mais competente',
                  draggable: false
                },
                {
                  value: '',
                  draggable: true
                },
                {
                  value: 'e serviços',
                  draggable: false
                },
                {
                  value: '',
                  draggable: true
                },
                {
                  value: 'do país',
                  draggable: false
                },
              ]
            ]
          }
        },
        10: {
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
