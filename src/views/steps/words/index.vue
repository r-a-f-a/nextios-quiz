<template>
  <div class="puzzle-container">
      <div class="puzzle-row" v-for="(row, i) in puzzle" :key="i">
          <div class="puzzle-item">
              <span class="puzzle-letter" v-for="(letter, k) in row" :key="k">{{letter}}</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Words',
    data() {
        return {
            puzzle: [],
            letters: 'abcdefghijklmnoprstuvwy',
            options: { height: 10, width: 10, orientations: ['horizontal', 'vertical']},
            words: ['LOCAWEB', 'TESTE'],
            config: { x: 0, y: 0, orientation: null, word: '' }
        }
    },
    created() {
        this.initPuzzle()
    },
    methods: {
        initPuzzle() {
            for (let i = 0; i < this.options.height; i++) {
                this.puzzle.push([]);
                for (let j = 0; j < this.options.width; j++) {
                    this.puzzle[i].push('');
                }
            }
            this.fillPuzzle()
        },
        fillPuzzle() {
            for (let index = 0; index < this.words.length; index++) {
                this.findLocation(this.words[index])
            }
        },
        findLocation(word) {

            let size = word.length

            this.config.x = Math.floor(Math.random() * this.puzzle.length)
            this.config.y = Math.floor(Math.random() * this.puzzle.length)
            this.config.orientation = this.options.orientations[Math.floor(Math.random() * this.options.orientations.length)]

            if (this.config.x + size > this.puzzle.length || this.config.y + size > this.puzzle.length) {
                this.findLocation(word)
                return false
            }

            for (let index = 0; index < size; index++) {
                this.placeWordInPuzzle(word[index])
            }

        },
        placeWordInPuzzle(letter) {
            if (this.config.orientation === 'horizontal') {
                this.puzzle[this.config.y][this.config.x++] = letter
            } else {
                this.puzzle[this.config.y++][this.config.x] = letter
            }
        },
        randonLetter(){
            return this.letters[Math.floor(Math.random() * this.letters.length)]
        }
    }
}
</script>

<style scopped>
.puzzle-item{
    margin: auto;
    width: auto;
    height: auto;
    display: grid;
    grid-template: repeat(10, 10%)/repeat(10, 10%);
    position: relative;
    background-color: #ffffff;
    user-select: none;
}
.puzzle-letter{
    height: 70px;
    width: 70px;
    line-height: 70px;
    cursor: pointer;
    text-align: center;
    background-color: cyan;
    border: 1px solid #c9c9c9;
    user-select: none;
}
</style>