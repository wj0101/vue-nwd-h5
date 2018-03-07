<template>
  <transition name="slider">
    <div class="depository-card">
      <div class="title-bank">
        <div class="left-name">银行存管系统</div>
        <div class="right-logo-bank">
          <img src="./logo.jpg"/>
        </div>
      </div>
      <form>
        <div class="inputText mt15">
          <div class="text left15">真实姓名</div>
          <input type="tel" name="name" class="address" maxlength="11" v-model="infoData.realName" readonly="true">
        </div>
        <div class="inputText">
          <div class="text left15">身份证号</div>
          <input type="tel" name="id"  class="address" maxlength="1" v-model="infoData.idcard" readonly="true">
        </div>
        <div class="choice mt15" @click="searchPage">
          <div class="text">开户行</div>
          <div class="choice-info">
            <span>{{infoData.bankAdd}}</span>
            <div class="icon-right-arrow"></div>
          </div>
        </div>
        <div class="inputText">
          <div class="text left15">银行卡号</div>
          <input type="tel" name="card"  class="address" maxlength="11" v-model="infoData.bankcard" placeholder="请输入借记卡卡号">
        </div>
        <div class="inputText">
          <div class="text left15">预留手机号</div>
          <input type="tel" name="card"  class="address" maxlength="11" v-model="infoData.phoneNum" placeholder="银行预留手机号">
        </div>
        <div class="agreement">
            <span>
              <input type="checkbox" class="input_check" id="check3"  @click="alocked()" :checked="state">
              <label for="check3"></label>
            </span>
          <div class="link">
            <span class="text-authorization">我已阅读并同意</span>
            <a href="javascript:;">《资金托管协议》</a>
            <a href="javascript:;">《快捷投资协议》</a>
          </div>
        </div>
        <div class="button" @click="showInfoConfirm">
          <button type="button" class="btn">开通存管账户</button>
        </div>
      </form>
      <search-bank></search-bank>
      <info-confirm name="信息确认" ref="infoConfirm" :info="infoData" @confirm="getCardState"></info-confirm>
      <prompt ref="prompt" :message="messageCon" ></prompt>
      <state-card ref="statecard"></state-card>
      <state-card-warning ref="statecardwarning"></state-card-warning>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import SearchBank from 'components/search-bank/search-bank'
  import {mapActions, mapMutations} from 'vuex'
  import InfoConfirm from 'base/info-confirm/info-confirm'
  import Prompt from 'base/prompt/prompt'
  import StateCard from 'base/state-card/state-card'
  import StateCardWarning from 'base/state-card-warning/state-card-warning'

  export default {
    data () {
      return {
        infoData: {
          realName: '王**',
          idcard: '310110*********221',
          bankcard: '',
          phoneNum: '',
          bankAdd: '招商银行'
        },
        messageCon: '',
        state: true
      }
    },
    components: {
      SearchBank,
      InfoConfirm,
      Prompt,
      StateCard,
      StateCardWarning
    },
    methods: {
      getCardState () {
        this.$refs.statecardwarning.show()
      },
      _submit () {
        this.$refs.prompt.show()
        setTimeout(() => {
          this.$refs.prompt.close()
        }, 2000)
      },
      showInfoConfirm () {
        if (!this.infoData.bankAdd) {
          this.messageCon = '请选择开户行'
          this._submit()
        } else if (!this.infoData.bankcard) {
          this.messageCon = '请填写银行卡号'
          this._submit()
        } else if (!this.infoData.phoneNum) {
          this.messageCon = '请填写预留手机号'
          this._submit()
        } else if (!this.state) {
          this.messageCon = '请勾选协议'
          this._submit()
        } else {
          this.$refs.infoConfirm.show()
        }
      },
      alocked () {
        this.state = !this.state
      },
      searchPage () {
        this.selectSearch({})
      },
      showConfirm () {
        this.$refs.confirm.show()
      },
      ...mapActions([
        'selectSearch'
      ]),
      ...mapMutations({
        setSearchFullScreen: 'SET_SEARCH_FULL_SCREEN',
        setStateBankCard: 'SET_STATE_BANK_CARD'
      })
    },
    mounted () {
      this.setSearchFullScreen(false)
    }
  }
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider-enter-active,.slider-leave-active
    transition :all 0.3s

  .slider-enter,.slider-leave-to
    transform :translate3D(100%,0,0)

  .depository-card
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color :$color-background
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
          color :$color-text-x
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
        margin:1.5rem 0 3rem 1.5rem
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
          .input_check:checked+label
            border: 1px solid #5462EB
        .link
          font-size :$font-size-small
          padding-left :1.5rem
          line-height 1.5
          position :absolute
          top :0
          left :1rem
          .text-authorization
            color :$color-text-x

      .choice
        display :flex
        flex-direction: row
        justify-content :space-between
        padding :1.5rem
        background-color :#fff
        font-size :$font-size-medium
        border-bottom :1px solid $color-border
        .text
          font-size :$font-size-medium
        .choice-info
          color :$color-text-x
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
          background: $color-blue
  .mt15
    margin-top :1.5rem

</style>
