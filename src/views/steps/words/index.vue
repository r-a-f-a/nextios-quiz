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
            options: { height: 30, width: 30, orientations: ['horizontal', 'vertical']},
            words: ['LOCAWEB', 'TESTE', 'LOCAL', "TERRA", "SERVIDOR", "CLOUD", "NARUTO", "VALORANT"],
            config: { x: 0, y: 0, orientation: null, word: '' }
        }
    },
    created() {
        this.initPuzzle()
    },
    methods: {
        initPuzzle() {
            // this.config = { x: 0, y: 0, orientation: null, word: '' }
            this.config.x = 0
            this.config.y = 0
            this.config.orientation = null
            this.word = ''
            for (let i = 0; i < this.options.height; i++) {
                this.puzzle.push([]);
                for (let j = 0; j < this.options.width; j++) {
                    this.puzzle[i].push('');
                }
            }
            this.fillPuzzle()
            this.fillRandom()
        },
        fillPuzzle() {
            for (let index = 0; index < this.words.length; index++) {
                this.findLocation(this.words[index])
            }
        },
        fillRandom(){
            for (let i = 0; i < this.options.height; i++) {
                for (let j = 0; j < this.options.width; j++) {
                    if(this.puzzle[i][j] === ''){
                        this.puzzle[i][j] = this.randonLetter();
                    }
                }
            }
        },
        findLocation(word) {
            
            // console.log('TRY TO FIND', word)

            let size = word.length


            this.config.x = Math.floor(Math.random() * this.puzzle.length)
            this.config.y = Math.floor(Math.random() * this.puzzle.length)
            this.config.orientation = this.options.orientations[Math.floor(Math.random() * this.options.orientations.length)]

            // console.log('CONFIGS', {x: this.config.x , y: this.config.y, o: this.config.orientation , word})
        
            
            if (this.config.x + size > this.puzzle.length || this.config.y + size > this.puzzle.length) {
                this.findLocation(word)
                return false
            }
            let line = this.getLine(size)
        
            if(line.length > 0){
                this.findLocation(word)
                return false
            }

            for (let index = 0; index < size; index++) {
                this.placeWordInPuzzle(word[index])
            }

        },
        getLine(size){
            let line = []
            if (this.config.orientation === 'horizontal') {
                let wordSize = (this.config.x + size)
                for (let index = this.config.x; index < wordSize; index++) {
                    if(this.puzzle[this.config.y][index] != ''){
                        line.push(this.puzzle[this.config.y][index]);
                    }
                }
            } else {
                let wordSize = (this.config.y + size)
                for (let index = this.config.y; index < wordSize; index++) {
                    if(this.puzzle[index][this.config.x] != ''){
                        line.push(this.puzzle[index][this.config.x]);
                    }
                }
            }
            return line
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
    grid-template: repeat(30,1%)/repeat(30, 20px);
    position: relative;
    background-color: #ffffff;
    user-select: none;
}
.puzzle-letter{
    text-transform: uppercase;
    height: 20px;
    width: 20px;
    line-height: 20px;
    cursor: pointer;
    text-align: center;
    background-color: cyan;
    border: 1px solid #c9c9c9;
    user-select: none;
}
</style>