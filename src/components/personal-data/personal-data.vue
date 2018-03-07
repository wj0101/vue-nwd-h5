<template>
  <transition name="slider">
    <div class="personal-data">
      <div class="wrapper" ref="wrapper">
        <div class="inner">
          <div class="title">请完善您的个人资料</div>
          <ul class="list">
            <li @click="routerData">
              <div class="icon-img">
                <img src="https://static.niwodai.com/loansH5/20161116/imgnew/personData.png">
              </div>
              <div class="text">个人资料</div>
              <div :class="iconPicture1"></div>
            </li>
            <li @click="idpage" v-if="miaolaInputPhoto">
              <div class="icon-img">
                <img src="https://static.niwodai.com/loansH5/20161116/imgnew/phoneUpload.png">
              </div>
              <div class="text">照片上传</div>
              <div :class="iconPicture2"></div>
            </li>
            <li @click="directoryPage">
              <div class="icon-img" >
                <img src="https://static.niwodai.com/loansH5/20161116/imgnew/phoneValite.png">
              </div>
              <div class="text">通讯信息验证</div>
              <div :class="iconPicture3"></div>
            </li>
            <li @click="zhimaPage">
              <div class="icon-img">
                <img src="https://static.niwodai.com/loansH5/20161116/imgnew/zhima.png">
              </div>
              <div class="text">芝麻信用验证</div>
              <div :class="iconPicture4"></div>
            </li>
            <li @click="creditCardPage" v-if="miaolaInputCard">
              <div class="icon-img">
                <img src="https://static.niwodai.com/loansH5/20161116/imgnew/cardNerw.png">
              </div>
              <div class="text">信用卡验证</div>
              <div :class="iconPicture5"></div>
            </li>
          </ul>
          <div class="secrecy">资料仅用于你我贷审核，信息严格保密 </div>
          <div class="button">
            <a href="javascript:;" @click="btnSetData" class="btn" ref="btnSty" :style="btnColor">测测我的额度</a>
          </div>
        </div>
      </div>
      <prompt :message="messageInfo" ref="prompt"></prompt>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import BScroll from 'better-scroll'
  import Prompt from 'base/prompt/prompt'

  export default {
    mounted () {
      setTimeout(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        })
      }, 100)
    },
    data () {
      return {
        personalBoolean: false,
        upload: false,
        communication: false,
        sesame: false,
        creditCard: false,
        rout: this.$route.path,
        messageInfo: ''
      }
    },
    components: {
      Prompt
    },
    methods: {
      btnSetData () {
        this.$router.push(`${this.rout}/confirm-loan`)
        /*
        if (this.personalBoolean && this.upload && this.communication && this.creditCard) {
          console.log(11)
        } else {
          return
        }
        */
      },
      routerData () {
        this.$router.push(`${this.rout}/data`)
      },
      idpage () {
        if (this.personalBoolean) {
          this.$router.push(`${this.rout}/idcard`)
        } else {
          this.messageInfo = '请先完成个人资料'
          this._buttonSet()
          return
        }
      },
      directoryPage () {
        if (this.personalBoolean && this.upload) {
          this.$router.push(`${this.rout}/directory`)
        } else if (!this.personalBoolean) {
          this.messageInfo = '请先完成个人资料'
          this._buttonSet()
          return
        } else if (!this.upload) {
          this.messageInfo = '请先完成照片上传'
          this._buttonSet()
          return
        }
      },
      zhimaPage () {
        if (this.personalBoolean && this.upload && this.communication) {
          this.$router.push(`${this.rout}/zhima`)
        } else if (!this.personalBoolean) {
          this.messageInfo = '请先完成个人资料'
          this._buttonSet()
          return
        } else if (!this.upload) {
          this.messageInfo = '请先完成照片上传'
          this._buttonSet()
          return
        } else if (!this.communication) {
          this.messageInfo = '请先完通讯信息验证'
          this._buttonSet()
          return
        }
      },
      creditCardPage () {
        if (this.personalBoolean && this.upload && this.communication) {
          this.$router.push(`${this.rout}/credit-card`)
        } else if (!this.personalBoolean) {
          this.messageInfo = '请先完成个人资料'
          this._buttonSet()
          return
        } else if (!this.upload) {
          this.messageInfo = '请先完成照片上传'
          this._buttonSet()
          return
        } else if (!this.communication) {
          this.messageInfo = '请先完通讯信息验证'
          this._buttonSet()
          return
        } else if (!this.sesame) {
          this.messageInfo = '请先完芝麻信用验证'
          this._buttonSet()
          return
        }
      },
      _buttonSet () {
        this.$refs.prompt.show()
        this.timer = setTimeout(() => {
          this.$refs.prompt.close()
        }, 2000)
      },
      ...mapMutations({
        setStateBankCard: 'SET_STATE_BANK_CARD',
        setStatePhoto: 'SET_STATE_PHOTO'
      })
    },
    computed: {
      btnColor () {
        if (this.personalBoolean && this.upload && this.communication && this.creditCard) {
          this.$refs.btnSty.style.backgroundColor = '#5462EB'
        } else {
          return
        }
      },
      iconPicture1 () {
        if (!this.personalBoolean) {
          return 'icon-right-arrow'
        } else {
          return 'icon-right-adopt'
        }
      },
      iconPicture2 () {
        if (!this.upload) {
          return 'icon-right-arrow'
        } else {
          return 'icon-right-adopt'
        }
      },
      iconPicture3 () {
        if (!this.communication) {
          return 'icon-right-arrow'
        } else {
          return 'icon-right-adopt'
        }
      },
      iconPicture4 () {
        if (!this.sesame) {
          return 'icon-right-arrow'
        } else {
          return 'icon-right-adopt'
        }
      },
      iconPicture5 () {
        if (!this.creditCard) {
          return 'icon-right-arrow'
        } else {
          return 'icon-right-adopt'
        }
      },
      miaolaInputPhoto () {
        if (this.rout === '/recommend/miaola/personal-data') {
          this.setStatePhoto(true)
          return false
        } else {
          return true
        }
      },
      miaolaInputCard () {
        if (this.rout === '/recommend/miaola/personal-data') {
          this.setStateBankCard(true)
          return false
        } else {
          return true
        }
      },
      ...mapGetters([
        'statePersonalData',
        'statePhoto',
        'stateCommunic',
        'stateBankCard'
      ])
    },
    watch: {
      statePersonalData (val) {
        this.personalBoolean = val
      },
      statePhoto (val) {
        this.upload = val
      },
      stateCommunic (val) {
        this.communication = val
      },
      stateBankCard (val) {
        this.creditCard = val
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

  .personal-data
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color :$color-background
    .title
      font-size :$font-size-small
      height :4rem
      line-height :4rem
      text-align :center
      color :$color-text-x
    ul.list
      li
        background-color :#fff
        display :flex
        flex-direction:row
        justify-content: flex-start
        position :relative
        height :7rem
        line-height :7rem
        border-bottom :1px solid $color-border
        .icon-img
          -ms-transform: scale(0.5)
          -webkit-transform: scale(0.5)
          transform: scale(0.5)
          vertical-align: middle
          padding-left :1rem
          flex: 0 0 5rem
        .text
          flex:1
          font-size :$font-size-medium
        .icon-right-arrow
          border-right: 0.2rem solid #999;
          border-top: 0.2rem solid #999;
          height: 1.2rem;
          width: 1.2rem;
          transform: rotate(45deg);
          -webkit-transform: rotate(45deg);
          border-left: 0.2rem solid transparent;
          border-bottom: 0.2rem solid transparent;
          display: inline-block;
          margin-right: 1.5rem
          position :absolute
          right :0
          top :50%
          margin-top :-.6rem
        .icon-right-adopt
          position: absolute
          right: 0
          top: 50%
          margin-top :-1rem
        .icon-right-adopt:before
          content: ''
          position: absolute
          left: -30px
          top: 0
          display: inline-block
          width: 20px
          height: 20px
          border-radius: 50%
          border: 1px solid #4cd764
          background: #4cd764
        .icon-right-adopt:after
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
    .secrecy
      padding :1.5rem
      font-size :$font-size-medium
      color :$color-text-x
    .button
      margin :1.5rem auto 0 auto
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
        background: $btn-bg-color
        display :block
  .wrapper
    height: 100%
    overflow: hidden
    position :relative
</style>
