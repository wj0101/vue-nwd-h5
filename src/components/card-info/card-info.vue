<template>
  <transition name="slider">
    <div class="card-info">
      <div class="data-wrapper" ref="dataWrapper">
        <div>
          <div class="title">
            本卡为收款卡,需在本人名下
          </div>
          <form @submit.prevent="submitCard">
            <div class="inputText">
              <div class="text left15">信用卡卡号</div>
              <input type="tel" name="card" value="" placeholder="请输入信用卡卡号" class="address" maxlength="11" v-model="cardNum">
            </div>
            <div class="choice" @click="searchPage">
              <div class="text">开户行</div>
              <div class="choice-info">
                <span>{{bankAdd}}</span>
                <div class="icon-right-arrow"></div>
              </div>
            </div>
            <div class="choice" @click.stop="showCity">
              <div class="text">开户省市</div>
              <div class="choice-info">
                <span>{{aggregateShow()}}</span>
                <div class="icon-right-arrow"></div>
              </div>
            </div>
            <div class="remind">
              <dl>
                <dt>请确认：</dt>
                <dd>1.建议绑定您常用的信用卡，并确保卡片状态正常</dd>
                <dd>2.仅限借款人本人的信用卡，并且开户信息正确</dd>
                <dd>3.借款审批通过后，借款资金将发放到当前信用卡</dd>
              </dl>
            </div>
            <div class="button">
              <button type="button" class="btn" @click="setCardData">保存</button>
            </div>
          </form>
        </div>
      </div>
      <city ref="city" @getDistrict="valDistrict" @getCity="valCity" @getProvince="valProvince"></city>
      <prompt :message="messageText" ref="prompt"></prompt>
      <search-bank></search-bank>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import City from 'base/city/city'
  import Prompt from 'base/prompt/prompt'
  import SearchBank from 'components/search-bank/search-bank'
  import {mapActions, mapMutations} from 'vuex'

  export default {
    components: {
      City,
      Prompt,
      SearchBank
    },
    data () {
      return {
        area: '开户行所在省市',
        city: '',
        province: '',
        messageText: '',
        cardNum: '',
        bankAdd: 'a'
      }
    },
    methods: {
      setCardData () {
        if (!this.cardNum) {
          this.messageText = '请填写信用卡卡号'
          this._buttonSet()
        } else if (this.bankAdd === '选择开户行') {
          this.messageText = '请选择开户行'
          this._buttonSet()
        } else if (!this.province) {
          this.messageText = '请选择开户省市'
          this._buttonSet()
        } else {
          this.setStateBankCard(true)
          this.messageText = '保存成功'
          this._buttonSet()
          setTimeout(() => {
            this.$router.back()
          }, 2000)
        }
      },
      _buttonSet () {
        this.$refs.prompt.show()
        setTimeout(() => {
          this.$refs.prompt.close()
        }, 2000)
      },
      valDistrict (val) {
        this.area = val
      },
      valCity (val) {
        this.city = val
      },
      valProvince (val) {
        this.province = val
      },
      aggregateShow () {
        return `${this.province} ${this.city} ${this.area}`
      },
      showCity () {
        this.$refs.city.showAdd()
      },
      submitCard () {
      },
      _submit () {
        this.$refs.prompt.show()
        setTimeout(() => {
          this.$refs.prompt.close()
        }, 3000)
      },
      searchPage () {
        this.selectSearch({})
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

  .card-info
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color :$color-background
    .title
      text-align :center
      padding :1.5rem
      color :$color-coupon-orange
      font-size :$font-size-small
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
      .choice
        display :flex
        flex-direction: row
        justify-content :space-between
        padding :1.5rem
        background-color :#fff
        font-size :$font-size-medium
        border-bottom :1px solid $color-border
        .text
          font-size :$font-size-medium-x
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
      .remind
        padding :1.5rem
        font-size:$font-size-small
        line-height :1.5
        color :$color-text-x
  .data-wrapper
    height: 100%
    overflow: hidden
    position :relative
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
</style>
