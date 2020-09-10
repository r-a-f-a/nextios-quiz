<template>
    <div class="puzzle-content">
        <div class="puzzle-grid">
            <template v-for="(row, i) in puzzle">
                <div 
                    class="puzzle-letter" 
                    v-for="(letter, k) in row"
                    :key="i+k" 
                    :data-x="i"
                    :data-y="k"
                    @mousedown="captureOn(i, k)" 
                    @mouseup="captureOff()" 
                    @mousemove="choose(i, k)"
                >
                    {{letter}}
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Words',
    data() {
        return {
            wordTeste: '',
            puzzle: [],
            active: '',
            captureToggle: false,
            letters: 'aábcçdeéfghijklmnoóprstuúvwy',
            options: { height: 20, width: 20, orientations: ['horizontal', 'vertical']},
            words: ['FINANÇAS', 'MANUFATURA', 'GOVERNO', "EDUCAÇÂO", "GÁS", "ÓLEO", "AUTOMOTIVA"],
            config: { x: 0, y: 0, orientation: null, word: '' }
        }
    },
    created() {
        this.initPuzzle()
    },
    methods: {
        initPuzzle() {
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
            // this.fillRandom()
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
            
            let size = word.length

            this.config.x = Math.floor(Math.random() * this.puzzle.length)
            this.config.y = Math.floor(Math.random() * this.puzzle.length)
            this.config.orientation = this.options.orientations[Math.floor(Math.random() * this.options.orientations.length)]
            
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
        },
        captureOn(i, k) {
            this.captureToggle = true
            console.log(i, k)
        },
        captureOff() {
            this.captureToggle = false
        },
        choose(i, k) {
            let letter = this.puzzle[i][k]
            console.log('letter', letter)
        }
    }
}
</script>

<style scopped>
.puzzle-content{
    position: relative;
    display: flex;
    flex-direction: row;
    min-width: 0;
}
.puzzle-grid{
    width: 100%;
    height: 100%;
    display: grid;
    position: relative;
    grid-template-columns: repeat(20, auto);
    grid-template-rows: repeat(20, auto);
    grid-auto-flow: column;
    user-select: none;
}
.puzzle-letter {
    color: #fff;
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    cursor: pointer;
    border: 1px solid #c9c9c9;
    background-color: darkgray;
    text-transform: uppercase;
}
.active{
    background-color: deeppink !important;
}
</style>