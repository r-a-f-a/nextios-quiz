<template>
  <div
    :class="isAlive ? 'alive' : 'dead'"
    class="cell"
    @click="selectCell(false)"
    @mouseover="selectCell(isMouseDown)"
    @mousedown="selectCell(true), getPos('startPos')"
    @mouseup="getPos('endPos')"
  >
    {{letter}}
  </div>
</template>
<script>
export default {
  props: {
    statusObj: {
      default: function () {
        return {
          letter: '',
          isAlive: false
        };
      },
      type: Object,
    },
    setup: {
      letter: '',
      isAlive: false
    },
    xPos: {
      default: -1,
      type: Number,
    },
    yPos: {
      default: -1,
      type: Number,
    },
    isMouseDown: {
      default: false,
      type: Boolean,
    },
  },
  data () {
    return {
      letter: this.setup.letter,
      isAlive: this.setup.isAlive,
      coordinates: []
    };
  },
  methods: {
    selectCell (bool) {
      if (bool) {
        this.isAlive = !this.isAlive
      }
    },
    getPos (value) {
      let coord = {
        x: this.xPos,
        y: this.yPos
      }
      this.$events.emit(value, coord)
    }
  }
};
</script>

<style>
.cell {
  display: flex;
  flex: 1;
  border: 1px solid #fff;
  justify-content: center !important;
  align-items: center !important;
  cursor: pointer;
  user-select: none;
  background-color: #e5e8ec;
}
.cell:hover {
  background-color: #7fffd4;
}
.alive {
  color: #fff;
  background-color: #228b22 !important;
}
</style>