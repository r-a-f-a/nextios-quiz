<template>
    <div class="game-content">
        <div class="game-grid columns"
            @mousedown="isMouseDown = true"
            @mouseup="isMouseDown = false"
            @mouseleave="isMouseDown = false">
            <div
                v-for="(col, indexX) in puzzle"
                :key="indexX"
                class="game-column">
                <app-cell
                    v-for="(obj, indexY) in col"
                    :key="indexY"
                    :setup="obj"
                    :x-pos="indexX"
                    :y-pos="indexY"
                    :is-mouse-down="isMouseDown"
                />
            </div>
        </div>
    </div>
</template>
<script>
import Cell from './cell';
export default {
    name: 'puzzle',
    components: {
        'app-cell': Cell
    },
    data() {
        return {
            puzzle: [],
            isMouseDown: false,
            letters: 'aábcçdeéfghijklmnoóprstuúvwy',
            options: {
                width: 20,
                height: 20,
                orientations: ['horizontal', 'vertical']
            },
            selected: [],
            found: [],
            // words: ['FOO', 'BAR', 'QUX'],
            words: ['FINANÇAS', 'MANUFATURA', 'GOVERNO', "EDUCAÇÂO", "GÁS", "ÓLEO", "AUTOMOTIVA"],
            config: { x: 0, y: 0, orientation: null, word: '' }
        }
    },
    created() {
        this.selected = []
        this.initPuzzle();
    },
    mounted() {
        let _this = this
        this.$events.off('startPos')
        this.$events.on('startPos', function (coord){
            _this.selected.push(coord)
        })
        this.$events.off('endPos')
        this.$events.on('endPos', function (coord){
            _this.selected.push(coord)
        })
    },
    watch: {
        selected: function () {
            if (this.selected.length === 2) {
                this.getWordSelected()
            }
        }
    },
    methods: {
        initPuzzle() {
            for (let i = 0; i < this.options.width; i++) {
                this.puzzle[i] = [];
                for (let j = 0; j < this.options.height; j++) {
                    this.puzzle[i][j] = {
                        letter: '',
                        isAlive: false
                    };
                }
            }
            this.cellCount = this.options.width * this.options.height;
            this.fillPuzzle()
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
                        line.push(this.puzzle[this.config.y][index].letter);
                    }
                }
            } else {
                let wordSize = (this.config.y + size)
                for (let index = this.config.y; index < wordSize; index++) {
                    if(this.puzzle[index][this.config.x].letter != ''){
                        line.push(this.puzzle[index][this.config.x].letter);
                    }
                }
            }
            return line
        },
        placeWordInPuzzle(letter) {
            if (this.config.orientation === 'horizontal') {
                this.puzzle[this.config.y][this.config.x++].letter = letter
            } else {
                this.puzzle[this.config.y++][this.config.x].letter = letter
            }
        },
        getWordSelected() {
            if (this.selected[0].y === this.selected[1].y) {
                let range = this.selected[1].x - this.selected[0].x
                let word = []
                for (let index = 0; index <= range; index++) {
                    let data = this.puzzle[this.selected[0].x++][this.selected[0].y]
                    word += data.letter
                }
                this.found.push(word)
            }
            this.selected = []
        }
    }
}
</script>

<style>
.game-content{
    width: 500px;
    height: 500px;
    position: relative;
    display: flex;
    flex-direction: row;
    min-width: 0;
    padding: 0;
    margin: 0;
}
.game-grid {
    display: flex;
    flex: 1;
    justify-content: center;
}
.game-column {
    flex: 1;
    display: flex;
    justify-content: center;
    padding: 0;
    margin: 0 auto;
    flex-direction: column;
}
</style>