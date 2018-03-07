<template>
  <transition name="slider">
    <div class="message">
      <scroll :data="messageData" class="message-wrapper">
        <div class="inner">
          <ul>
            <li v-for="item in messageData" class="info">
              <div class="title-text">
                <div class="name" v-text="item.name">嘉卡贷审批拒绝</div>
                <div class="timer">
                  <i class="clock">
                    <span class="topPointer"></span>
                    <span class="rightPointer"></span>
                  </i>
                  <span v-text="time(item)"></span>
                </div>
              </div>
              <p v-text="item.text"></p>
            </li>
          </ul>
        </div>
      </scroll>
      <preloader v-show="!messageData.length"></preloader>
      <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="noResultText" :text="backText"></no-result>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import NoResult from 'base/no-result/no-result'
  import Scroll from 'base/scroll/scroll'
  import Preloader from 'base/preloader/preloader'

  export default {
    components: {
      NoResult,
      Scroll,
      Preloader
    },
    computed: {
      noResult () {
        return !this.messageData.length
      },
      noResultText () {
        return '您暂时没有消息'
      },
      backText () {
        return '返回上一页'
      }
    },
    data () {
      return {
        messageData: []
      }
    },
    methods: {
      getMessageData () {
        this.$ajax.get('static/messagedata.json?t=' + (new Date()).getTime().toString()).then((response) => {
          this.messageData = response.data.list
        }).catch((error) => {
          console.log(error)
        })
      },
      time (item) {
        return `${item.date} ${item.timer}`
      }
    },
    created () {
      this.getMessageData()
    }
  }
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider-enter-active,.slider-leave-active
    transition :all 0.3s

  .slider-enter,.slider-leave-to
    transform :translate3D(100%,0,0)

  .message
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color :$color-background
    ul
      margin-top :3rem
      background-color :#fff
      li
        margin :0 0 0 2rem
        border-bottom :1px solid $color-border
        display: flex
        flex-direction:column
        padding :2rem 2rem 2rem 0
        font-size :$font-size-medium
        line-height :1.2
        color :$color-text-x
        .title-text
          display: flex
          flex-direction:row
          justify-content:space-between
          padding-bottom :1rem
          .name
            color :#23262b
            font-size :$font-size-medium-x
          .timer
            position :relative
            .clock
              width :1.5rem
              height :1.5rem
              position :absolute
              border-radius :50%
              border :.1rem solid $color-text-x
              left :-2rem
              .topPointer
                position :absolute
                left :.5rem
                top :50%
                margin-top :-.3rem
                height :.4rem
                width :.2rem
                background-color:$color-text-x
              .rightPointer
                position :absolute
                left :.5rem
                top :50%
                margin-top :0
                height :.2rem
                width :.4rem
                background-color:$color-text-x
        p
          text-align:justify
  .message-wrapper
    height: 100%
    overflow: hidden
    position :relative
    .inner
      padding-bottom :8rem
  .no-result-wrapper
    position: absolute
    width: 100%
    top: 40%
    transform: translateY(-50%)
</style>
