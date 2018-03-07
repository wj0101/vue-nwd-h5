<template>
  <transition name="popup-fade">
    <div class="popup" v-show="showFlag" @click.stop>
      <div class="popup-wrapper">
        <div class="popup-content">
          <h3 class="title">{{name}}</h3>
          <div class="text">
            <form>
              <div class="box" v-for="(item,index) in radioBox" ref="radiotask">
                <input type="radio" :id="idnum(item)" :value="item.value" v-model="picked" name="radio"/>
                <label :for="idnum(item)" >{{item.text}}</label>
              </div>
              <p class="prompt" v-if="picked === 5">(根据监管规则，无指定用途不放款)</p>
            </form>
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
  import {debounce} from 'common/js/util'

  export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: '借款用途'
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      },
      cancelBtnText: {
        type: String,
        default: '确定'
      },
      pickedValue: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        showFlag: false,
        picked: '',
        radioBox: [
          {
            text: '个人生活消费',
            value: 1
          },
          {
            text: '租房装修',
            value: 2
          },
          {
            text: '电子数码',
            value: 3
          },
          {
            text: '旅游',
            value: 4
          },
          {
            text: '无指定用途',
            value: 5
          }
        ]
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
        if (this.picked === 5) {
          return
        } else {
          this.hide()
          this.$emit('cancel')
        }
      },
      confirm () {
        this.hide()
        this.$emit('confirm')
      },
      idnum (item) {
        return `radio-${item.value}`
      }
    },
    created () {
      this.$watch('picked', debounce((newquery) => {
        this.$emit('picked', newquery)
      }, 500))
      this.picked = this.pickedValue
    },
    watch: {
      picked (newval) {
        if (newval === 5) {
          return
        }
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
      transform: translate(-50%, -50%)
      z-index: 999
      .popup-content
        width: 270px
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
        .text
          padding: 19px 15px
          line-height: 22px
          text-align: center
          font-size: $font-size-large
          color: $color-text-l
          .box
            position: relative
            height: 3rem
            margin-left :2rem
            font-size :$font-size-medium
            input[type="radio"]
              position: absolute
              left: 0
              top: 0
              width: 20px
              height:20px
              opacity: 0
            label
              position: absolute
              left: 30px
              line-height: 20px
              top: 0
            label:before
              content: ''
              position: absolute
              left: -30px
              top: 0
              display: inline-block
              width: 20px
              height: 20px
              border-radius: 50%
              border: 1px solid #ddd
              transition: all 0.3s ease
              -webkit-transition: all 0.3s ease
              -moz-transition: all 0.3s ease
            label:after
              content: ''
              position: absolute
              left: -28px
              top: -2px
              display: inline-block
              width: 5px
              height: 10px
              border: 2px solid #fff
              border-top: none
              border-left: none
              transform: rotate(45deg)
              margin-top: 6px
              margin-left: 6px
              transition: all 0.3s ease
              -webkit-transition: all 0.3s ease
              -moz-transition: all 0.3s ease
            input[type='radio']:checked + label:before
              border-color: #4cd764
              background: #4cd764
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
