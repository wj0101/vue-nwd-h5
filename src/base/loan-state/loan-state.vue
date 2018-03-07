<template>
  <transition name="slider">
    <div class="loan-state" v-show="showFlag">
      <div class="inner">
        <div class="state-result">
          <div class="icon-style-success" v-if="state===1">
            <div class="line"></div>
            <div class="vertical-line"></div>
          </div>
          <div class="icon-style-warning" v-if="state===2">
            <div class="icon-line"></div>
            <div class="line-bottom-width"></div>
          </div>
          <div class="icon-style-fail"  v-if="state===3">
            <div class="line-top icon-line"></div>
            <div class="line-bottom icon-line"></div>
          </div>
          <h3>{{title}}</h3>
          <h4>{{explain}}</h4>
          <p>{{text}}</p>
          <div class="button">
            <button type="button" class="btn" @click="backpage">返回首页</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      },
      state: {
        type: Number,
        default: 0
      },
      explain: {
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
      backpage () {
        this.$router.back()
      },
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

  .loan-state
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
        line-height :1.5
        position: absolute
        left: 50%
        top: 35%
        width :100%
        transform: translate(-50%, -50%)
        .icon-style-warning
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
        .icon-style-success
          width :6rem
          height :6rem
          border-radius: 50%
          border: 2px solid #27c594
          position :relative
          margin : auto
          overflow:hidden
          .line
            width :2.5rem
            height :.4rem
            background :#27c594
            position: absolute
            transform: rotate(140deg)
            top: 45%
            left: 34%
          .vertical-line
            width :1.5rem
            height :.4rem
            background: #27c594
            position: absolute
            transform: rotate(50deg)
            top: 50%
            left: 20%
        .icon-style-fail
          width :6rem
          height :6rem
          border-radius: 50%
          border: 2px solid $color-text-red
          position :relative
          margin : auto
          .icon-line
            width :2.6rem
            height :.4rem
            background :$color-text-red
            position :absolute
            left: 50%
            top: 50%
            margin-top :-.2rem
            margin-left :-1.3rem
            &.line-top
              transform: rotate(-45deg)
            &.line-bottom
              transform: rotate(45deg)
        h3
          padding :2rem 2rem 0 2rem
          font-size :$font-size-large
        h4
          font-size :$font-size-large
        p
          font-size :$font-size-medium
          color :$color-text-x
          padding : 2rem 8%
      .button
        margin :3rem auto 0 auto
        width :80%
        text-align :center
        .btn
          border-radius: .3rem
          font-size: $font-size-medium-x
          color: #fff
          width :100%
          height :5rem
          line-height :5rem
          background: $color-blue

</style>
