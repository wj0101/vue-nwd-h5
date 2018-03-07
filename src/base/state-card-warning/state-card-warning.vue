<template>
  <transition name="slider">
    <div class="state-card-warning" v-show="showFlag">
      <div class="inner">
        <div class="state-result">
          <div class="icon-style-fail">
            <div class="icon-line"></div>
            <div class="line-bottom-width"></div>
          </div>
          <h3>很抱歉!</h3>
          <p>目前恒丰银行网站系统异常，请稍后再试</p>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  export default {
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
      hideState () {
        this.hide()
      }
    }
  }
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider-enter-active,.slider-leave-active
    transition :all 0.3s

  .slider-enter,.slider-leave-to
    transform :translate3D(0,100%,0)

  .state-card-warning
    position: fixed
    z-index: 200
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color :$color-background
    .inner
      .state-result
        text-align:center
        line-height :2
        position: absolute
        left: 50%
        top: 35%
        width :100%
        transform: translate(-50%, -50%)
        .icon-style-fail
          width :6rem
          height :6rem
          border-radius: 50%
          border: 2px solid $color-coupon-orange
          position :relative
          margin : auto
          .icon-line
            width :.4rem
            height :2rem
            background :$color-coupon-orange
            position :absolute
            left: 50%
            top: 50%
            margin-top :-1.4rem
            margin-left :-.2rem
          .line-bottom-width
            width .4rem
            height .4rem
            background :$color-coupon-orange
            position :absolute
            left: 50%
            top: 70%
            margin-left :-.2rem
        h3
          padding-top :2rem
          font-size :$font-size-large
        p
          font-size :$font-size-medium
          color :$color-text-x
          padding : 0 23%
</style>
