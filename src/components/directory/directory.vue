<template>
  <transition name="slider">
    <div class="directory">
      <div class="directory-wrapper">
        <form>
          <div class="inputText">
            <div class="text left15">手机号</div>
            <input type="tel" name="phone" value="" placeholder="请填写真实的手机号码" class="address" maxlength="11" v-model="telNum" readonly="true">
          </div>
          <div class="inputText">
            <div class="text left15">服务密码</div>
            <input type="password" name="password" value="" placeholder="请输入服务密码" class="address" maxlength="6" v-model="passwordNum">
          </div>
          <div class="telOperating">
            <span class="textLeft">忘记服务密码请拨打：</span>
            <a href="tel:10086">移动</a>
            <a href="tel:10010">联通</a>
            <a href="tel:10000">电信</a>
          </div>
          <p class="explain">您的授权信息仅用于信用评估和提借款服务，我们承诺不会泄露给他人或第三方机构。</p>
          <div class="agreement">
            <span>
              <input type="checkbox" class="input_check" id="check3" checked="checked">
              <label for="check3"></label>
            </span>
            <a href="https://loans.niwodai.com/loans2.0/mobile/staticPage?type=ZGNZ_TX" class="link">
              <span class="text-authorization">同意授权</span>
              <span>《手机运营商授权协议》</span>
            </a>
          </div>
          <div class="button">
            <button type="button" class="btn" @click="bottomSub">验证手机号码</button>
          </div>
        </form>
        <a class="qs" href="http://m.niwodai.com/index.do?method=ac&artId=3800002192361393&app=2">常见问题</a>
      </div>
      <prompt :message="messagePhone" ref="prompt"></prompt>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import Prompt from 'base/prompt/prompt'
  import {mapMutations, mapGetters} from 'vuex'

  export default {
    data () {
      return {
        telNum: '13817062044',
        passwordNum: '',
        messagePhone: ''
      }
    },
    mounted () {
      if (!this.statePhoto) {
        setTimeout(() => {
          this.$router.back()
        }, 500)
      } else {
        return
      }
    },
    components: {
      Prompt
    },
    methods: {
      bottomSub () {
        if (this.passwordNum === '') {
          this.messagePhone = '请输入服务密码'
          this._bottomSub()
        } else if (this.passwordNum.length < 6) {
          this.messagePhone = '请输入6位服务密码'
          this._bottomSub()
        } else {
          this.stateCommunic(true)
          this.messagePhone = '验证成功'
          this._bottomSub()
          setTimeout(() => {
            this.$router.back()
          }, 2000)
        }
      },
      _bottomSub () {
        this.$refs.prompt.show()
        setTimeout(() => {
          this.$refs.prompt.close()
        }, 2000)
      },
      ...mapMutations({
        stateCommunic: 'SET_STATE_COMMUNIC'
      })
    },
    computed: {
      ...mapGetters([
        'statePhoto'
      ])
    }
  }
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider-enter-active,.slider-leave-active
    transition :all 0.3s

  .slider-enter,.slider-leave-to
    transform :translate3D(100%,0,0)

  .directory
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color :$color-background
    .directory-wrapper
      margin-top :1.5rem
      form
        .inputText
          display :flex
          padding :1.7rem 3rem 1.5rem 0
          border-bottom :1px solid $color-border
          font-size :$font-size-medium-x
          flex-direction:row-reverse
          position :relative
          background-color :#fff
          .text
            position :absolute
            left :0
          .address
            text-align :right
            width :50%
            font-size :$font-size-medium
          .left15
            left :1.5rem
        .telOperating
          height :5rem
          line-height :5rem
          padding-left :1.5rem
          font-size :$font-size-small
          color :$color-text-x
          a
            padding : 0 1rem
        .explain
          color :$color-text-x
          font-size :$font-size-small
          padding : 0 1.5rem 1.5rem 1.5rem
          line-height :1.5
        .agreement
          margin:0 0 0 1.5rem
          position :relative
          span
            .input_check
              position: absolute
              visibility: hidden
              vertical-align: middle
            .input_check+label
              display: inline-block
              width: 1.4rem
              height: 1.4rem
              border: 1px solid #A5A4AB
            .input_check:checked+label:after
              content: ""
              position: absolute
              left: .2rem
              bottom: .8rem
              width: .6rem
              height: .2rem
              border: .2rem solid #5462EB
              border-top-color: transparent
              border-right-color: transparent
              -ms-transform: rotate(-45deg)
              -moz-transform: rotate(-45deg)
              -webkit-transform: rotate(-45deg)
              transform: rotate(-45deg)
          .link
            font-size :$font-size-small
            padding-left :1rem
            position :absolute
            top :.2rem
            .text-authorization
              color :$color-text-x

     .qs
       text-align: center
       display :block
       font-size :$font-size-medium-x
       color :$color-blue
  .button
    margin :3rem auto 0 auto
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
