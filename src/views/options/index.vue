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
          :class="{
            'option-desc': true,
            disabled: !answers.includes(option),
            option: true,
          }"
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
  created() {
    this.$events.off("VALIDATE_QUESTION");
    this.$events.on("VALIDATE_QUESTION", () => {
      this.validate();
    });
  },
  mounted() {
    this.$events.emit("QUESTION_STARTED", this.configs.question)
  },
  methods: {
    removeOption(option) {
      const indexToRemove = this.answers.indexOf(option);
      this.answers.splice(indexToRemove, 1);
      return;
    },
    chooseOption(option) {
      // REMOVING OPTION
      if (this.answers.includes(option)) return this.removeOption(option);

      // IF CHOOSE LIMIT IS NULL, LIMIT NOT EXIST
      if (!this.configs.chooseLimit) return this.answers.push(option);

      // IF ARE NOT AT THE LIMIT
      if (this.answers.length != this.configs.chooseLimit)
        this.answers.push(option);

      // IF ONLY HAVE 1 ANSWER, TRANSFORM MECHANISM INTO A RADIO
      if (this.configs.chooseLimit == 1) {
        this.removeOption(this.answers[0]);
        this.answers.push(option);
      }
    },
    validate() {
      if (
        this.answers.length > 0 &&
        this.answers.length <= this.configs.chooseLimit
      ) {
        this.$events.emit('QUESTION_ANSWERED', { question: this.configs.question, response: this.answer } )
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
  width: 90%;
  margin: auto;
}

.option {
  font-size: 28px;
  font-weight: bold;
}

.option-item {
  margin: 35px 0;
  max-width: 100%;
  display: flex;
}

.option-desc {
  color: #41e4aa;
  font-weight: 300;
  cursor: pointer;
}

.option-index {
  color: #1e3344;
  border-bottom: 4px solid #41e4aa;
  max-height: 40px;
  margin: 0 15px;
}
</style>
