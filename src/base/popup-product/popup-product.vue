<template>
  <transition name="popup-fade">
    <div class="popup" v-show="showFlag" @click.stop>
      <div class="popup-wrapper">
        <div class="popup-content">
          <h3 class="title">{{name}}</h3>
          <div class="text-details" ref="wrapper">
            <div class="inner">
              <h3 class="header-text">申请条件</h3>
              <p>1）年龄20-45周岁</p>
              <p>2）有本人名下信用卡和借记卡</p>
              <p>3）本人手机号需实名认证</p>
              <p>4）暂不支持新疆和西藏地区的申请</p>
              <p>5）借款用户不能为支付购房首付款或者全款</p>
              <h3 class="header-text">申请条件</h3>
              <p>1）年龄20-45周岁</p>
              <p>2）有本人名下信用卡和借记卡</p>
              <p>3）本人手机号需实名认证</p>
              <p>4）暂不支持新疆和西藏地区的申请</p>
              <p>5）借款用户不能为支付购房首付款或者全款</p>
              <h3 class="header-text">申请条件</h3>
              <p>1）年龄20-45周岁</p>
              <p>2）有本人名下信用卡和借记卡</p>
              <p>3）本人手机号需实名认证</p>
              <p>4）暂不支持新疆和西藏地区的申请</p>
              <p>5）借款用户不能为支付购房首付款或者全款</p>
            </div>
          </div>
          <div class="operate">
            <div @click="cancel" class="operate-btn left">x</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      name: {
        type: String,
        default: '产品详情'
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      },
      cancelBtnText: {
        type: String,
        default: '确定'
      }
    },
    data () {
      return {
        showFlag: false,
        picked: ''
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {})
      })
    },
    methods: {
      show () {
        this.showFlag = true
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.wrapper, {})
        })
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
      top: 50%;
      left: 50%;
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      z-index: 999
      .popup-content
        width: 27rem
        height :40rem
        border-radius: .5rem
        background: #fff
        .title
          color :#fff
          background-color :$color-blue
          height :4rem
          text-align :center
          line-height :4rem
          font-size :$font-size-medium-x
          border-top-right-radius :.5rem
          border-top-left-radius :.5rem
        .text-details
          padding: 0 2rem 2rem 2rem
          line-height: 2.2rem
          text-align: left
          font-size: $font-size-large
          color: $color-text-l
          overflow: hidden
          position :relative
          height :36rem
          width: 27rem
          .header-text
            font-size :$font-size-medium
            font-weight :600
            padding-top :1rem
          p
            font-size :$font-size-small
            color :$color-text-x
          .prompt
            font-size :$font-size-small
            color :red
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
