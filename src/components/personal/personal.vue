<template>
  <transition name="slider">
    <div class="personal">
      <div class="header" :style="bgImgs">
        <div class="info">
          <div class="user-name" >{{$store.state.userInfo.nick}}</div>
          <div class="phone">手机号：{{$store.state.userInfo.iphone}}</div>
        </div>
      </div>
      <div class="content">
        <ul>
          <li @click="couponPages">
            <div class="icon-voucher"></div>
            <p class="textname">我的礼券</p>
            <div class="icon-right-arrow"></div>
          </li>
          <li @click="messagePages">
            <div class="icon-message"></div>
            <p class="textname">消息通知</p>
            <div class="icon-right-arrow"></div>
          </li>
        </ul>
      </div>
      <div class="app-bown c_middle">
        <img src="./img.png" alt="">
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        bgImg: require('./bg.png')
      }
    },
    methods: {
      couponPages () {
        this.$router.push('/personal/coupon')
      },
      messagePages () {
        this.$router.push('/personal/message')
      }
    },
    computed: {
      bgImgs () {
        return `background-image:url(${this.bgImg})`
      }
    }
  }
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider-enter-active,.slider-leave-active
    transition :all 0.3s

  .slider-enter,.slider-leave-to
    transform :translate3D(100%,0,0)

  .personal
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color :$color-background
    .header
      background :no-repeat $color-blue
      position: relative
      width: 100%
      height: 0
      padding-top: 40%
      transform-origin: top
      background-size: cover
      .info
        width:100%
        position: absolute
        top: 50%
        left: 50%
        -moz-transform: translate(-50%, -50%)
        -ms-transform: translate(-50%, -50%)
        -webkit-transform: translate(-50%, -50%)
        transform: translate(-50%, -50%)
        text-align :center
        color :#fff
        line-height :2
        .user-name
          font-size :$font-size-large-x
        .phone
          font-size :$font-size-medium-x
  .content
    margin-top :1.5rem
    ul
      li
        background-color :#fff
        display :flex
        flex-direction:row
        justify-content: space-between
        position :relative
        padding :1.1rem
        margin-bottom :1.5rem
        .icon-voucher
          width: 4.1rem
          height: 2.8rem
          background: url(./myInfo.png) no-repeat -2px 0
          -ms-transform: scale(0.5)
          -webkit-transform: scale(0.5)
          transform: scale(0.5)
        .icon-message
          width: 4.2rem
          height: 3.5rem
          background: url(./myInfo.png) no-repeat -43px 0
          display: inline-block
          -ms-transform: scale(0.5)
          -webkit-transform: scale(0.5)
          transform: scale(0.5)
          vertical-align: middle
        .textname
          flex:1
          font-size :$font-size-medium
          line-height :2
        .icon-right-arrow
          border-right: 0.2rem solid #999
          border-top: 0.2rem solid #999
          height: 1.2rem
          width: 1.2rem
          transform: rotate(45deg)
          -webkit-transform: rotate(45deg)
          border-left: 0.2rem solid transparent
          border-bottom: 0.2rem solid transparent
          display: inline-block
          margin-right: 1.5rem
          position :absolute
          right :0
          top :50%
          margin-top :-.6rem
  .app-bown
    position :absolute
    bottom :0
    left :0
    right :0
    img
      display :block
      height: auto
      width :100%

</style>
