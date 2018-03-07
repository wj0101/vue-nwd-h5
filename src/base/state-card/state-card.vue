<template>
  <transition name="slider">
    <div class="state-card" v-show="showFlag">
      <div class="inner">
        <div class="title-bank">
          <div class="left-name">银行存管系统</div>
          <div class="right-logo-bank">
            <img src="./logo.jpg"/>
          </div>
        </div>
        <div class="state-result">
          <div class="icon-style-fail">
            <div class="line-top icon-line"></div>
            <div class="line-bottom icon-line"></div>
          </div>
          <h3>很抱歉!</h3>
          <p>绑卡失败，银行卡无效，请更换银行卡后重试</p>
        </div>
        <div class="button" @click="hideState">
          <button type="button" class="btn">返回</button>
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

  .state-card
    position: fixed
    z-index: 200
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color :$color-background
    .inner
      .title-bank
        display: flex
        align-items: center
        flex-direction: row
        justify-content:space-between
        padding :0 1.5rem
        height :6rem
        background-color :#fff
        margin-top :1.5rem
        border-bottom :1px solid $color-border
        font-size :$font-size-medium
        .right-logo-bank
          transform: scale(0.5)
          vertical-align: middle
          margin-right :-3.5rem
      .state-result
        text-align:center
        background :#fff
        margin: 1.5rem 0
        width :100%
        line-height :2
        padding :2rem 0
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
          padding-top :2rem
          font-size :$font-size-large
        p
          font-size :$font-size-medium
          color :$color-text-x
          padding : 0 23%
      .button
        margin :2rem auto 0 auto
        width :80%
        text-align :center
        padding-bottom :5rem
        .btn
          border-radius: .3rem
          font-size: $font-size-medium-x
          color: #fff
          width :100%
          height :5rem
          line-height :5rem
          background: $color-blue
</style>
