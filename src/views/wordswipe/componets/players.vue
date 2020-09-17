<template>
  <section class="app-players">
    <span v-for="(player, idx) in players" :class="{active : (idx == current)}" class="app-player" :key='idx'>
      <div>
        <i class="fa fa-male icon" aria-hidden="true"></i>
      </div>
      <span class="text">{{player.name}} </span>
    </span>

  </section>
</template>
<script>

export default {
    data: function () {
        return {
            players: [],
            current: 0
        }
    },
    mounted: function () {

    },
    methods: {
        setPlayers: function (pcount) {
            for (let i = 0; i < pcount; i++) {
                this.players.push({ name: 'player-' + (i + 1), score: 0 });
            }
        },

        getCurrentPlayer: function() {
            return (this.players[this.current]);
        },

        getWinner: function() {
            let idx = 0, scr = this.players[idx].score;
            this.players.forEach((pla, cidx) => {
                if(pla.score > scr) {
                    idx = cidx;
                    scr = pla.score;
                }
            });
            return this.players[idx];
        },

        nextPlayer: function () {
            return(this.current = (this.current + 1) % this.players.length);
        },

        reset: function() {
            this.players = [];
            this.current = 0;
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

.app-players {
    display:none;
    position: absolute;
    width: 100%;
    .app-player {
        display: inline-block;
        margin: 5px;
        color: #fff;
        opacity: 0.3;
        transform: scale(0.7);
        transition: 0.5s ease all;
        &.active {
            opacity: 0.8;
            transform: scale(1);
            color: #ef5350;
            text-shadow: 1px 1px 10px rgba(255, 255, 255, 1);
        }
    }
    text-align: center;
    .icon {
        font-size: $font-sm;
    }
    .text {
        font-size: $font-xs - 2;
    }
}
</style>