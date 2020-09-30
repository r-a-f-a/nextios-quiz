<template>
  <div class="complete">
    <div class="phrase">
      <div>
        <span
          v-on:click="chooseWords(word)"
          v-for="(word, idx) in phrase"
          :key="idx"
          class="phrase-word"
        >
          {{ word }}
        </span>
      </div>
      <div class="phrase-line"></div>
    </div>

    <ol class="words-list">
      <li
        class="word-item"
        v-on:click="chooseWords(word)"
        v-for="(word, idx) in configs.words"
        :key="idx"
      >
        <span
          :class="{
            'word-desc': true,
            disabled: !phrase.includes(word),
            word: true,
          }"
          >{{ word }}</span
        >
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "complete",
  props: ["configs"],
  mounted() {
    this.$events.off("VALIDATE_QUESTION");
    this.$events.on("VALIDATE_QUESTION", () => {
      this.validate();
    });
  },
  methods: {
    chooseWords(word) {
      if (this.phrase.includes(word)) {
        const indexToRemove = this.phrase.indexOf(word);
        this.phrase.splice(indexToRemove, 1);
        return;
      }
      this.phrase.push(word);
    },
    validate() {
      if (this.phrase.length > 0) {
        this.$events.emit("ANSWER_QUESTION", this.phrase);
        this.phrase = [];
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
      phrase: [],
    };
  },
};
</script>

<style scoped>
.complete {
  height: 100%;
}

.disabled {
  color: white !important;
  background-color: #1e3344 !important;
}

.phrase {
  min-height: 200px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.phrase-line {
  background-color: grey;
  width: 60%;
  height: 0.5px;
}

.phrase-word {
  cursor: pointer;
  padding: 0 5px;
}

.phrase-word:hover {
  background-color: #1e3344;
  color: white;
  padding: 0 5px;
}

.words-list {
  list-style-type: none;
  width: 73%;
  margin: auto;

  background-color: white;
  display: flex;
  flex-wrap: wrap;
}

.word-item {
  display: block;
  float: left;
  margin: 5px;
  padding: 10px;
}

.word-desc {
  font-weight: 500;
  background-color: transparent;
  color: #1e3344;
  cursor: pointer;
  padding: 10px;
}

.word-desc:hover {
  background-color: transparent !important;
  color: #1e3344 !important;
  cursor: pointer;
  padding: 10px;
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
