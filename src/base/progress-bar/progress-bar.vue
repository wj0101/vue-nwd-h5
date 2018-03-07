<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="progresstouchstrat"
           @touchmove.prevent="progresstouchmove"
           @touchend="touchmovetouchend">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const bollWidth = 15
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      },
      percentmin: {
        type: Number,
        default: 0
      },
      percentmax: {
        type: Number,
        default: 0
      },
      percentum: {
        type: Number,
        default: 0
      }
    },
    created () {
      this.touch = {}
    },
    methods: {
      progresstouchstrat (e) {
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progresstouchmove (e) {
        if (!this.touch.initiated) {
          return
        }
        const barwidth = this.$refs.progressBar.clientWidth - bollWidth
        const newX = e.touches[0].pageX - this.touch.startX
        const offetWidth = Math.min(barwidth, Math.max(0, this.touch.left + newX))
        this._offset(offetWidth)
        this._tiggleProgress()
      },
      touchmovetouchend () {
        this.touch.initiated = false
        this._tiggleProgress()
      },
      progressClick (e) {
        const rect = this.$refs.progressBar.offsetLeft
        const offsetWidth = e.pageX - rect
        this._offset(offsetWidth)
        this._tiggleProgress()
      },
      _offset (moveWidth) {
        this.$refs.progressBtn.style['transform'] = `translate3d(${moveWidth}px, 0, 0)`
        this.$refs.progress.style.width = `${moveWidth}px`
      },
      _tiggleProgress () {
        const barwidth = this.$refs.progressBar.clientWidth - bollWidth
        const minwidth = (this.$refs.progress.clientWidth / barwidth + this.percentum) * (this.percentmax - this.percentmin) + this.percentum * 6
        const percents = Math.round(minwidth)
        this.$emit('percentChange', percents)
      }
    },
    mounted () {
      const barwidth = this.$refs.progressBar.clientWidth - bollWidth * 4
      const moveWidth = this.percent * barwidth
      this.$refs.progressBtn.style['transform'] = `translate3d(${moveWidth}px, 0, 0)`
      this.$refs.progress.style.width = `${moveWidth}px`
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 3rem
    .bar-inner
      position: relative
      top: 1.3rem
      height: .3rem
      background: $color-progress-bar
      .progress
        position: absolute
        height: 100%
        background: $color-progress-bar-orange
      .progress-btn-wrapper
        position: absolute
        left: -.8rem
        top: -1.3rem
        width: 3rem
        height: 3rem
        .progress-btn
          position: relative
          top: .7rem
          left: .7rem
          box-sizing: border-box
          width: 1.6rem
          height: 1.6rem
          border-radius: 50%
          background: $color-progress-bar-orange
          -webkit-box-shadow: 0 0 0 7px rgba(255, 149, 65, .3);
          -moz-box-shadow: 0 0 0 7px rgba(255, 149, 65, .3);
          box-shadow: 0 0 0 7px rgba(255, 149, 65, .3);
</style>
