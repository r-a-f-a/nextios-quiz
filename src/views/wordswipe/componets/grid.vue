<template>
  <ul class="app-grid list">
    <svg id='appIllustrations' ref="appIllustrations" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>
    <li v-for="(letter, idx) in letters" class="grid-letter" :key="idx"> {{letter}}</li>
  </ul>
</template>
<script>

import Utility from './utility'
import Puzzler from './puzzler'
// import Snap from 'snapsvg'
// const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);
let mouseDown = false;
let puzzle;

export default {

    data: function () {
        return {
            letters: ``,
            words: [],
            selword: ''
        }
    },
    mounted: function () {
        //
        let _this = this;
        var space = 14
        var ySpace = 15
        var paper = window.Snap(this.$refs.appIllustrations);
        let p1, p2, lp1, lp2, cp2, line;
        window.$(".app-grid").on("mousedown", ".grid-letter", function () {
            window.$( "#appIllustrations .line-1" ).not( ".selected" ).remove();
            mouseDown = true;
            let idx = window.$(this).index(".grid-letter")
            p1 = window.$(this).position();
            lp1 = {
                y: Math.floor(idx / ySpace),
                x: ((idx % 15))
            }
            line = paper.line(p1.left + space, p1.top + space, p1.left + space, p1.top + space);
            line.attr({
                class: "line-1"
            });
        });
        window.$(".app-grid").on("mouseenter", ".grid-letter", function () {
            if (mouseDown) {
                p2 = window.$(this).position();
                let idx = window.$(this).index(".grid-letter")
                cp2 = {
                    y: Math.floor(idx / ySpace),
                    x: ((idx % 15))
                }
                if (Utility.isValidMove(Utility.Math.getAngle(lp1.x, lp1.y, cp2.x, cp2.y))) {
                    line.attr({
                        x2: p2.left + space,
                        y2: p2.top + space
                    });
                    let selWord = _this.getSelectedWord(Utility.lettersBetween(lp1.x, lp1.y, cp2.x, cp2.y));
                    _this.$emit("word-select", selWord);
                }

            }
        })
        window.$(".app-grid").on("mouseup", ".grid-letter", function () {
            mouseDown = false;
            let idx = window.$(this).index(".grid-letter");
            lp2 = {
                y: Math.floor(idx / ySpace),
                x: ((idx % 15))
            }
            let selWord = _this.getSelectedWord(Utility.lettersBetween(lp1.x, lp1.y, lp2.x, lp2.y));
            let matchedIndex = _this.words.findIndex((word) => {
                 return (!word.done && (word.word == selWord))
             });
            
            if (matchedIndex == -1) {
                window.$(line.node).fadeOut("slow", function () {
                    window.$(this).remove();
                });
            } else {
                line.attr({
                    class: "line-1 selected"
                });
                _this.$emit("word-match", matchedIndex);
            }
            _this.$emit("word-select", "");
        })

        window.$(".viewport").mouseup(function() {
            if(mouseDown) {
                window.$( "#appIllustrations .line-1" ).not( ".selected" ).remove();
                // window.$('#appIllustrations .line-1').fadeIn("slow", function () {
                //     if (!window.$(this).hasClass("selected")) {
                //         window.$(this).remove();
                //     }
                // });
                _this.$emit("word-select", "");
            }
        });
    },
    methods: {
        initPuzzle(words) {
            this.words = words;
            puzzle = Puzzler.generatePuzzle(this.words.map((word) => { return word.word }), 15, 15);
            var lttrs = "";
            puzzle.forEach((row) => {
                lttrs += row.join("");
            });
            this.letters = lttrs;
        },
        getSelectedWord(data) {
            let word = "";
            data.indices.forEach((idx) => {
                word += this.letters[idx]
            })
            return word;
        },

        reset() {
            window.$('#appIllustrations line').remove();
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

@mixin text-shadow(){
    text-shadow: 1px 1px 2px rgba(150, 150, 150, 0.5);
}

.app-grid {
    width: 100%;
    min-height: 100px;
    box-sizing: border-box;
    padding: 5px;
    position: relative;
    .grid-letter {
        list-style-type: none;
        transition: all .3s ease;
        display: inline-block;
        font-size: 12px;
        font-weight: bold;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: 6.6%;
        text-align: center;
        padding: 5px 10px;
        color: #1e3344;
        text-transform: uppercase;
        text-shadow: 1px 1px 2px hsla(0,0%,59%,.5);
        border: 1px solid #1e3344;
        cursor: pointer;
        // &:before {
        //     content: '';
        //     display: inline-block;
        //     position: absolute;
        //     height: 100%;
        //     left: 100%;
        //     border-right: 1px solid #eee;
        // }
        &:hover {
            // opacity: 0.6;
            color: #fff;
            background: #1e3344;
        }
    }
}
// rgba(150, 150, 150, 0.5)
#appIllustrations {
    display: block;
    position: absolute;
    left: 0;
    top:0;
    height: 100%;
    width: 100%;
    pointer-events: none;
    // border:1px solid black;
   
}
</style>