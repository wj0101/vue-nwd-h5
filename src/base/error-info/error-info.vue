<template>
  <transition name="popup-fade">
    <div class="popup" v-show="showFlag" @click.stop>
      <div class="popup-wrapper">
        <div class="popup-content">
          <div class="text-details">
            <div class="table-data">
              {{text}}
            </div>
          </div>
          <div class="button" @click="confirm">
            <button type="button" class="btn">回首页</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      text: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        showFlag: false,
        picked: ''
      }
    },
    methods: {
      show () {
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      },
      cancel () {
        this.hide()
        this.$emit('cancel')
      },
      confirm () {
        this.hide()
        this.$emit('confirm')
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .popup
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 998
    background-color: $color-background-d
    &.popup-fade-enter-active
      animation: confirm-fadein 0.3s
      .popup-content
        animation: confirm-zoom 0.3s
    .popup-wrapper
      position: absolute
      top: 50%
      left: 50%
      -moz-transform: translate(-50%, -50%)
      -ms-transform: translate(-50%, -50%)
      -webkit-transform: translate(-50%, -50%)
      transform: translate(-50%, -50%)
      z-index: 999
      .popup-content
        width: 27rem
        border-radius: .5rem
        background: #fff
        .title
          color :$color-blue
          height :4rem
          text-align :center
          line-height :4rem
          font-size :$font-size-medium-x
          border-top-right-radius :.5rem
          border-top-left-radius :.5rem
        .text-details
          padding: 1rem 2rem
          line-height: 2.2rem
          text-align: left
          font-size: $font-size-large
          color: $color-text-x
          overflow: hidden
          position :relative
          width: 27rem
          .table-data
            display: flex
            align-items: center
            flex-direction: row
            justify-content:space-between
            height :4rem
            background-color :#fff
            font-size :$font-size-medium
            .left-list
              color: $color-text-x
        .button
          margin :0 auto
          width :100%
          text-align :center
          .btn
            border-bottom-left-radius :.3rem
            border-bottom-right-radius :.3rem
            font-size: $font-size-medium-x
            color: #fff
            width :100%
            height :5rem
            line-height :5rem
            background: $color-blue
        .operate
          display: flex
          align-items: center
          text-align: center
          font-size: $font-size-large
          position :absolute
          right :-1rem
          top :-1rem
          .operate-btn
            flex: 1
            color: #fff
            width 3rem
            height :3rem
            line-height :3rem
            border-radius :50%
            background-color :$color-blue
  @keyframes confirm-fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes confirm-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>
