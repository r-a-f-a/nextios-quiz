<template>
  <section class="app-score">
    <span class="score-item">
      <div class="label">TIME</div>
      <div class="text">{{time}}</div>
    </span>
    <span class="score-item">
      <div class="label">SCORE</div>
      <div class="text">{{score}}</div>
    </span>
    <span class="score-item">
      <div class="label">BEST</div>
      <div class="text">{{best}}</div>
    </span>
  </section>
</template>
<script>

let timer = null;
let mm = 0, ss = 0;
export default {
    data: function () {
        return {
            time: '00:00',
            score: 0,
            best: 0
        }
    },
    mounted: function () {

    },
    methods: {
        startTimer: function () {
            timer = setInterval(() => {
                ss += 1;
                if (ss > 59) {
                    mm += 1;
                    ss = 0;
                }
                this.time = `${mm}:${ss}`;
            }, 1000)
        },

        stopTimer: function () {
            clearInterval(timer);
        },

        resetTimer: function () {
            ss = mm = 0;
        },

        reset: function() {
            this.time = '00:00';
            this.score = 0;
            this.best = 0;
            this.stopTimer();
            this.resetTimer();
        },

        getTimer: function () {
            return ({ mm: mm, ss: ss });
        },

        getScore: function() {
            return ({score:this.score, best: this.best});
        },

        setScore: function(llen) {
            this.score = llen;
            this.best = Math.max(this.best, llen);
        }
        //Event handlers
    }
}
</script>
<style lang="scss" scoped>
$font-xs : 12px;
$font-sm: 16px;
$font-md: 20px;
$font-lg: 24px;

$grey-color: #888;
$fb-blue: #365899;
$fb-bg: #f1f1f1;

.app-score {
    display:none;
    position: absolute;
    width: 100%;
    margin-top: 55px; 
    text-align: center;
    .score-item {
        text-align: center;
        position: relative;
        display: inline-block;
        margin: 0 18px;
        &:not(:last-child):after {
            content: '';
            position: absolute;
            height: 90%;
            top: 5px;
            left: 140%;
            border-right: 1px solid rgba(255, 255, 255, 0.4);
        }
        .label {
            font-size: $font-xs - 1;
            color: #f1c40f;
        }
        .text {
            font-size: $font-lg;
            font-weight: bold;
            color: #fff;
            opacity: 0.8;
            text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
        }
    }
}
</style>