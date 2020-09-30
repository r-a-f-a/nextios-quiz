<template>
  <div class="options">
    <ol class="options-list">
      <li
        class="option-item"
        v-on:click="chooseOption(option)"
        v-for="(option, idx) in configs.options"
        :key="idx"
      >
        <span class="option-index option">{{ letters[idx] }}</span>
        <span
          :class="{'option-desc': true, disabled: !answers.includes(option), option: true}"
          >{{ option }}</span
        >
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "options",
  props: ["configs"],
  mounted() {
    this.$events.off("VALIDATE_QUESTION");
    this.$events.on("VALIDATE_QUESTION", () => {
      this.validate();
    });
  },
  methods: {
    chooseOption(option) {
      if (this.answers.includes(option)) {
        const indexToRemove = this.answers.indexOf(option);
        this.answers.splice(indexToRemove, 1);
        return;
      }
      if (!this.configs.chooseLimit) return this.answers.push(option);
      if (this.answers.length != this.configs.chooseLimit)
        this.answers.push(option);
    },
    validate() {
      if (
        this.answers.length > 0 &&
        this.answers.length <= this.configs.chooseLimit
      ) {
        this.$events.emit("ANSWER_QUESTION", this.answer);
        this.answers = [];
      } else {
        this.$events.emit("TIP_QUESTION", this.tip);
      }
    },
  },
  data() {
    return {
      tip: {
        type: "error",
        title: "Ops!",
        text: "Preencha todos os campos para continuar.",
      },
      answers: [],
      letters: ["A", "B", "C", "D", "E", "F", "G", "H"],
    };
  },
};
</script>

<style scoped>
.disabled {
  color: white !important;
}

.options-list {
  list-style-type: none;
  width: 73%;
  margin: auto;
}

.option {
  font-size: 30px;
  font-weight: bold;
}

.option-item {
  margin: 45px 0;
  max-width: 90%;
  display: flex;
}

.option-desc {
  color: #41e4aa;
  font-weight: 300;
}

.option-index {
  color: #1e3344;
  border-bottom: 4px solid #41e4aa;
  max-height: 40px;
  margin: 0 15px;
}

.boxItem .year {
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
.timeline-answer {
  float: left;
  width: 220px;
}
.timeline-answer .dropzone {
  height: auto;
}
.timeline-answer .dropzone:last-child {
  border-bottom: 0px !important;
}
.timeline {
  float: left;
}
.timeline-answer .box-question {
  float: left;
  margin-bottom: 10px;
}
.timeline-answer .box-question.answer-C {
  clear: both !important;
}

.box-question {
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
.box-question span {
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

.box-question p {
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

.drg {
  border: 1px solid black;
  height: 50px !important;
  width: 50px !important;
}

div.boxItem {
  display: block;
  border: 2px solid #1e3344;
  margin-right: 5em;
  position: relative;
  margin-bottom: 10px;
  height: 90px;
  width: 220px;
  float: left;
}
div.boxItem.dropzone {
  border: 2px dashed #1e3344 !important;
  margin-right: 40px;
}

div.boxItem:first-child {
  clear: both;
}

.boxItem:before,
.boxItem:after {
  content: "";
  width: 50px;
  border-bottom: 2px solid #1e3344;
  position: absolute;
  top: 50%;
}
:after {
  left: 100%;
}
:before {
  right: 100%;
}
.boxItem:first-of-type:before,
.boxItem:last-of-type:after {
  display: none;
}
</style>
