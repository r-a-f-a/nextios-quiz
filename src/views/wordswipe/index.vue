<template>
  <div class='app-screen'>
    <players ref="appPlayers"> </players>
    <score ref="appScore"> </score>
    <grid ref="appGrid" v-on:word-match="onWordMatch">
    </grid>
    <ul class="app-words">
      <li v-for="(word, idx) in words" :key="idx" class="grid-word" :class="{'word-done': word.done}">
        {{word.word}}
      </li>
    </ul>
  </div>
</template>

<script>

let gridController = null;
let playerController = null;
let scoreController = null;

let wordBase = []; // Dictionary
let wordsFound = 0; // No. of words found from the grid
let totalWords = 7; // No. of wors loaded into the grid
import grid from './componets/grid'
import players from './componets/players'
import score from './componets/score'
export default {
    name: 'wordswipe',
    components: {
      grid,
      players,
      score
    },
    data: function () {
        return {
            tip: {
                type: "error",
                title: "Ops!",
                text: "Encontre todas as palavras para continuar."
            },
            question: 5,
            selPlayer: 1, // Default 2 players game
            gameOn: false,
            gameMsg: '',
            words: []
        }
    },
    created: function () {
        this.$events.off('VALIDATE_QUESTION')
        this.$events.on('VALIDATE_QUESTION', () => {
            this.passNextPlayer()
        })
    },
    mounted: function () {
        this.$events.emit("QUESTION_STARTED", this.question)
        // let _this = this;
        console.log(this.$refs)
        gridController = this.$refs.appGrid;
        playerController = this.$refs.appPlayers;
        scoreController = this.$refs.appScore;
        // wordBase = ['FINANÇAS', 'MANUFATURA', 'GOVERNO', "EDUCAÇÂO", "GÁS", "ÓLEO", "AUTOMOTIVA"]
        // wordBase = ["GÁS", "ÓLEO"]
        wordBase = ['FINANÇAS', 'MANUFATURA', 'GOVERNO', 'EDUCAÇÃO', 'GÁS', 'ÓLEO', 'AUTOMOTIVA']
        this.initGame() 
    },
    methods: {
        initGame: function () {
            this.gameOn = true;
            this.prepareWords();
            playerController.setPlayers(this.selPlayer);
            gridController.initPuzzle(this.words);
            scoreController.startTimer();
        },

        // Suffle the words from dictionary
        prepareWords: function () {
            this.words = [];
            for (let i = 0; i < wordBase.length; i++) {
                this.words.push({
                    word: wordBase[i],
                    done: false
                })
            }
        },
        passNextPlayer: function () {
            let curPlayer;
            if (wordsFound === totalWords) {
                this.$events.emit('QUESTION_ANSWERED', { question: this.question, response: this.words } )
                return;
            } else {
               this.$events.emit('TIP_QUESTION', this.tip)
            }
            playerController.nextPlayer();
            curPlayer = playerController.getCurrentPlayer();
            scoreController.resetTimer();
            scoreController.setScore(curPlayer.score);
        },

        //Event handlers
        onWordMatch: function (idx) {
            let mword = this.words[idx];
            let curPlayer = playerController.getCurrentPlayer();
            mword.done = true;
            scoreController.setScore(curPlayer.score + mword.word.length * 10);
            curPlayer.score += mword.word.length * 10;
            wordsFound++;
        },

        onPlayerSelect: function (pcount) {
            this.selPlayer = pcount;
        },

        onGameStart: function () {
            // Router.navigate("start");
        }

        
    }
}
</script>

<style  lang="scss" scoped>

$font-xs : 12px;
$font-sm: 16px;
$font-md: 20px;
$font-lg: 24px;

$grey-color: #888;
$fb-blue: #365899;
$fb-bg: #f1f1f1;

body {
    font-family: sans-serif;
    background: linear-gradient(to right, #f1f1f1, #efefef); 
}
.viewport {
    position: relative;
}
.app-screen, .init-screen {
    // min-height: 400px;
    // max-width: 420px;
    // min-width: 320px;
    width: 50%;
    margin: 5px auto;
   // background: linear-gradient(to right, #00c6ff, #0072ff);
 }
.init-screen {
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    background-color: rgb(255, 255, 255);
}

 .app-header {
    height: 100px;
    position: relative;
    background: linear-gradient(to bottom, #C3F1FE, #5FA6FF);
    &:before {
            content: '';
            position: absolute;
            display: block;
            height: 100%;
            width: 100%;
            background-image: url(/static/pexels-photo.png);
            background-size: 45%;
            background-position-y: 100%;
            background-repeat:  repeat-x;
            background-color: #444444;
            opacity: 0.35;
            background-blend-mode: soft-light;
        }

}

.app-words {
    padding: 6px 15px;
    margin: 0;
    text-align: center;
    li {
        display: inline-block;
        font-weight: bold;
        min-width: 70px;
        text-align: center;
        font-size: $font-xs + 1;
        margin: 5px 10px;
        color: #4fe4ab;
        text-shadow: 1px 1px 2px rgba(150, 150, 150, 0.5);
        &.word-done {
            opacity: 0.7;
            color: #1e3344;
            text-decoration: line-through;
        }

    }
}
.btn-list {
    height: 30px;
    padding: 10px 20px;
    text-align: center;
}
.ghost-btn {
    padding: 10px 20px;
    background: #f5bccf;
    border: none;
    color: #fff;
    text-transform: uppercase;
    border-radius: 2px;
    font-weight: bold;
    margin: 0 15px;
    text-shadow: 1px 1px 2px rgba(150, 150, 150, 0.5);
}
.pull-left {
    float: left;
}
.pull-right {
    float: right;
}

.game-logo {
    width: 200px;
    height: 55px;
    margin: 30px auto;
    background-image: url(/static/logo.png);
    background-size: 100%;
}
.player-sel {
    text-align: center;
    .label {
        font-size: $font-xs + 2;
        color: #ade6e6;
        text-transform: uppercase;
    }
    .sel-btn {
        display: inline-block;
        height: 20px;
        width: 20px;
        padding: 5px;
        line-height: 22px;
        color: #ADE6E6;
        margin: 10px;
        border: 2px solid #d7f7f7;
        border-radius: 6px;
        cursor: pointer;
        &.active {
            color: #f5bccf;
            border-color:#f5bccf; 
        }
    }
}
.game-buttons {
    text-align: center;
    margin-top: 80px;
}
.msg-disp {
    text-align: center;
    color: #dcdcdc;
    font-size: 22px;
    margin-bottom: 25px;
}
</style>
