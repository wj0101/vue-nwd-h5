
<template>
  <transition name="slider">
    <div class="confirm-loan">
      <scroll class="confirm-loan-wrapper" ref="confirmLoanWrapper" :data="confirmData">
        <div class="inner">
          <div class="loan-num">
            <h3 class="top-name">借款金额(元)</h3>
            <div class="num-add-subtract">
              <span class="subtraction-min" @click="reduceNum">-</span>
              <input class="number-box" readonly="readonly" v-model="numberData"/>
              <span class="addition-add" @click="addNum">+</span>
            </div>
          </div>
          <div class="confirm-Detailed">
            <ul class="title-date" v-for="item in confirmData">
              <li>
                <div class="box">
                  <div class="left-text">借款期限</div>
                  <div class="right-number">{{item.date}}</div>
                </div>
              </li>
              <li v-for="items in item.actual">
                <div class="box" @click="changeCollapse(0,$event)">
                  <div class="left-text">实际到账(元)</div>
                  <div class="right-number color-blue">
                    {{items.total}}
                    <i class="icon-right-arrow" :class="{'close-span': !collapse[0].show}"></i>
                  </div>
                </div>
                <div class="event-box">
                  <ul class="slider-down-total">
                    <li>
                      <div class="box">
                        <div class="left-text cole-gray-text">平台服务费(元)</div>
                        <div class="right-number">
                          {{items.platform}}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="box">
                        <div class="left-text cole-gray-text">征信服务费</div>
                        <div class="right-number">
                          {{items.credit}}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="box">
                        <div class="left-text cole-gray-text">贷后服务费</div>
                        <div class="right-number">
                          {{items.after}}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li v-for="items in item.monthly">
                <div class="box" @click="changeCollapse(1,$event)">
                  <div class="left-text">每月应还(元)</div>
                  <div class="right-number color-blue">
                    {{items.payfor}}
                    <i class="icon-right-arrow" :class="{'close-span': !collapse[1].show}"></i>
                  </div>
                </div>
                <div class="event-box">
                  <ul class="slider-down-total">
                    <li>
                      <div class="box">
                        <div class="left-text cole-gray-text">每月应还本息(元)</div>
                        <div class="right-number">
                          {{items.principal}}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="box">
                        <div class="left-text cole-gray-text">每月应还贷后管理费(元)</div>
                        <div class="right-number">
                          {{items.admin}}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="box">
                        <div class="left-text cole-gray-text">每月应还平台管理(元)</div>
                        <div class="right-number">
                          {{items.terrace}}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div class="box" @click="changeCollapse(2,$event)">
                  <div class="left-text">我的礼券</div>
                  <div class="right-number color-orange">
                    {{couponInfo}}
                    <i class="icon-right-arrow" :class="{'close-span': !collapse[2].show}"></i>
                  </div>
                </div>
                <div class="event-box">
                  <ul class="slider-down-total">
                    <li>
                      <div class="input-box" v-for="(item,index) in radioBox" ref="radiotask">
                        <input type="radio" :id="idnum(item)" :value="item.value" v-model="couponed" name="radio"/>
                        <label :for="idnum(item)" >{{item.text}}</label>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div class="add-card" @click="addCardPages" v-show="!hasCard">
            <span class="plus">+</span>
            <i class="text">添加存管卡</i>
          </div>
          <div class="has-card" v-show="hasCard" v-for="item in confirmData">
            <div class="left-bank-name">
              <div class="icon-bank-logo">
                <img src="./icon.jpg"/>
              </div>
              <span v-for="items in item.bankCard">{{items.info}}</span>
            </div>
            <div class="right-notes">
              放款&还款代扣卡
            </div>
          </div>
          <div class="agreement" id="input-check1" @click="checkinput">
            <div class="box-input">
              <input type="checkbox" id="check1" name="checkbox1" :checked="checkedfirst"/>
              <label for="check1" ></label>
            </div>
            <b class="link">
              <span class="text-authorization beyond">本人承诺非在校大学生,且本次借款将用于合法消费或经营</span>
            </b>
          </div>
          <div class="agreement" id="input-check2" @click="checkinputag">
            <div class="box-input">
              <input type="checkbox" id="check2" name="checkbox2" :checked="checkedsecond"/>
              <label for="check2" ></label>
            </div>
            <b  class="link">
              <span class="text-authorization">同意</span>
              <a href="https://loans.niwodai.com/loans2.0/mobile/staticPage?type=ZGNZ_TX">《你我贷借款相关协议》</a>
            </b>
          </div>
          <div class="button">
            <button type="button" class="btn" @click="confirmLoan">确认借款</button>
          </div>
          <a href="javascript:;" class="abandon-loan" @click="showConfirm">放弃借款</a>
        </div>
      </scroll>
      <router-view></router-view>
      <confirm ref="confirm" text="审批额度仅与进件资料有关，放弃后再次申请会影响借款结果。" title="温馨提示" @confirm="confirmPath"></confirm>
      <prompt :message="messageInfo" ref="prompt"></prompt>
      <loan-state ref="loanstate" :title="textTitle" :text="textContent" :state="statePost" :explain="textExplain"></loan-state>
      <preloader v-show="!confirmData.length" ></preloader>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Confirm from 'base/confirm/confirm'
  import Prompt from 'base/prompt/prompt'
  import LoanState from 'base/loan-state/loan-state'
  import {mapMutations, mapGetters} from 'vuex'
  import Preloader from 'base/preloader/preloader'

  export default {
    components: {
      Scroll,
      Confirm,
      Prompt,
      LoanState,
      Preloader
    },
    data () {
      return {
        couponed: '1',
        radioBox: [
          {
            text: '全额免息',
            value: 1
          },
          {
            text: '5期还款免息',
            value: 2
          },
          {
            text: '100元还款抵用券',
            value: 3
          },
          {
            text: '50元还款抵用券',
            value: 4
          },
          {
            text: '2期还款免息',
            value: 5
          }
        ],
        collapse: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        couponInfo: '',
        couponVal: '',
        checkedfirst: true,
        checkedsecond: false,
        rout: this.$route.path,
        numberData: 20000,
        messageInfo: '',
        confirmData: [],
        hasCard: false,
        statePost: null,
        textTitle: '',
        textContent: '',
        textExplain: ''
      }
    },
    methods: {
      confirmLoan () {
        if (this.hasCard) {
          this.messageInfo = '请添加存管卡'
          this._submit()
        } else if (!this.checkedfirst) {
          this.messageInfo = '请勾选承诺协议'
          this._submit()
        } else if (!this.checkedsecond) {
          this.messageInfo = '请勾选协议'
          this._submit()
        } else {
          this.getSubmitstate()
          this.$refs.loanstate.show()
        }
      },
      _submit () {
        this.$refs.prompt.show()
        setTimeout(() => {
          this.$refs.prompt.close()
        }, 2000)
      },
      getConfirmData () {
        this.$ajax.get('static/confirmdata.json?t=' + (new Date()).getTime().toString()).then((response) => {
          this.confirmData = response.data.list
          let stateCard = this.confirmData[0].bankCard[0].card
          this.setAddBankCard(stateCard)
        }).catch((error) => {
          console.log(error)
        })
      },
      getSubmitstate () {
        this.$ajax.get('static/submitstate.json?t=' + (new Date()).getTime().toString()).then((response) => {
          this.statePost = response.data.state
          if (this.statePost === 1) {
            this.textTitle = '您的申请已成功提交！'
            this.textContent = '我们会尽快完成审核，并通过短信和站内信的方式通知您'
          } else if (this.statePost === 2) {
            this.textTitle = '很抱歉，当前借款产品本月内未通过次数过多，请下月再申请!'
          } else if (this.statePost === 3) {
            this.textTitle = '很遗憾，您的提交未审核通过!'
            this.textExplain = '原因:********'
            this.textContent = '建议您保持良好的消费习惯，过段时间再试!'
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      confirmPath () {
        this.$router.back()
      },
      showConfirm () {
        this.$refs.confirm.show()
      },
      addCardPages () {
        this.$router.push(`${this.rout}/depository-card`)
      },
      reduceNum () {
        if (this.numberData <= 1000) {
          return
        } else {
          this.numberData = this.numberData - 1000
        }
      },
      addNum () {
        if (this.numberData >= 30000) {
          return
        } else {
          this.numberData = this.numberData + 1000
        }
      },
      addevent () {
        document.addEventListener('tap', this._currentData, true)
      },
      checkinput () {
        document.getElementById('input-check1').addEventListener('tap', this.checkIt, true)
      },
      checkinputag () {
        document.getElementById('input-check2').addEventListener('tap', this.checkthis, true)
      },
      _currentData (event) {
        var focusTargetDom = event.target
        if (focusTargetDom.tagName.toLowerCase() === 'input' && focusTargetDom.getAttribute('name') === 'radio') {
          this.couponVal = focusTargetDom.value
          this.getCouponInfo(focusTargetDom.value)
        }
      },
      checkIt () {
        this.checkedfirst = !this.checkedfirst
        if (!this.checkedfirst) {
          document.getElementById('check1').setAttribute('checked', 'true')
        } else {
          document.getElementById('check1').removeAttribute('checked')
        }
      },
      checkthis () {
        this.checkedsecond = !this.checkedsecond
        if (!this.checkedsecond) {
          document.getElementById('check2').setAttribute('checked', 'true')
        } else {
          document.getElementById('check2').removeAttribute('checked')
        }
      },
      getCouponInfo (val) {
        if (val === '1') {
          this.couponInfo = '全额免息'
        } else if (val === '2') {
          this.couponInfo = '5期还款免息'
        } else if (val === '3') {
          this.couponInfo = '100元还款抵用券'
        } else if (val === '4') {
          this.couponInfo = '50元还款抵用券'
        } else if (val === '5') {
          this.couponInfo = '2期还款免息'
        }
      },
      idnum (item) {
        return `radio-coupon-${item.value}`
      },
      changeCollapse (num, event) {
        const show = this.collapse[num].show
        if (show) {
          this.closeCollapse(event)
        } else {
          this.openCollapse(event)
        }
        this.collapse[num].show = !show
      },
      closeCollapse (event) {
        let ulElement = event.currentTarget.nextElementSibling
        let children = ulElement.getElementsByTagName('ul')[0]
        ulElement.style.height = children.offsetHeight + 'px'
        setTimeout(() => {
          ulElement.style.height = '0px'
          setTimeout(() => {
            ulElement.style.display = 'none'
            this.$refs.confirmLoanWrapper.refresh()
          }, 300)
        }, 10)
      },
      openCollapse (event) {
        let ulElement = event.currentTarget.nextElementSibling
        let children = ulElement.getElementsByTagName('ul')[0]
        ulElement.style.display = 'block'
        ulElement.style.height = children.offsetHeight + 'px'
        setTimeout(() => {
          ulElement.style.height = 'auto'
          this.$refs.confirmLoanWrapper.refresh()
        }, 300)
      },
      _buttonSet () {
        this.$refs.prompt.show()
        this.timer = setTimeout(() => {
          this.$refs.prompt.close()
        }, 2000)
      },
      ...mapMutations({
        setAddBankCard: 'SET_ADD_BANK_CARD'
      })
    },
    computed: {
      ...mapGetters([
        'addBankCard'
      ])
    },
    created () {
      this.addevent()
      this.getConfirmData()
    },
    mounted () {
      this.getCouponInfo(this.couponed)
    },
    watch: {
      couponVal (val, oldval) {
        this.couponed = val
      },
      addBankCard (val, oldval) {
        this.hasCard = val
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

  .confirm-loan
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color :$color-background
    .loan-num
      margin-top :1.5rem
      background :#fff
      .top-name
        font-size :$font-size-medium
        text-align :center
        color :$color-text-x
        padding: 1.5rem 0
      .num-add-subtract
        display: flex
        flex-wrap: wrap
        justify-content: flex-end
        align-content: space-between
        text-align :center
        padding: 0 0 1.5rem 0
        .subtraction-min
          flex-grow:3
          text-align:center
          vertical-align:middel
          font-size :3rem
          color :$color-blue
        .number-box
          flex-grow:1
          text-align:center
          font-size :3rem
          width :33%
        .addition-add
          flex-grow:3
          font-size :3rem
          color :$color-blue
    .confirm-Detailed
      margin-top :1.5rem
      background #fff
      .title-date
        li
          .box
            display: flex
            flex-direction: row
            justify-content:space-between
            padding :1.8rem 1.8rem 1.8rem .5rem
            margin-left :1.3rem
            height :5rem
            background-color :#fff
            font-size :$font-size-medium
            border-bottom :1px solid $color-border
            .icon-right-arrow
              border-right: 0.2rem solid #999
              border-top: 0.2rem solid #999
              height: 1rem
              width: 1rem
              transform: rotate(135deg)
              -webkit-transform: rotate(135deg)
              border-left: 0.2rem solid transparent
              border-bottom: 0.2rem solid transparent
              display: inline-block
              margin-left :.5rem
              transition: transform .3s
              &.close-span
                transform: rotate(45deg)
                -webkit-transform: rotate(45deg)
            .color-blue
              color :$color-blue
            .color-orange
              color :$color-text-orange
          .event-box
            overflow: hidden
            transition: height .3s
            display :none
            background-color :$color-background
            .slider-down-total
              background :$color-background
              li
                .box
                  background :$color-background
                  padding :1.8rem 3rem
                  .cole-gray-text
                    color :$color-text-x
    .add-card
      display: flex
      justify-content: center
      align-items: center
      height :5rem
      background-color :#fff
      margin-top :1.5rem
      border-bottom :1px solid $color-border
      .plus
        font-size :$font-size-large-xl
        color :$color-blue
      .text
        font-size :$font-size-medium
        color :$color-blue
        padding-left :1rem
    .has-card
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
      .right-notes
        color :$color-text-x
      .left-bank-name
        flex :0 0 60%
        .icon-bank-logo
          transform: scale(0.4)
          vertical-align: middle
          display :inline-block
          margin-left -2rem
        span
          margin-left :-2.5rem
  .agreement
      margin:1.5rem 1.5rem
      position :relative
      .box-input
        height: 2rem
        font-size :$font-size-medium
        input[type="checkbox"]
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
          left: -25px
          top: 0
          display: inline-block
          width: 12px
          height: 12px
          border: 1px solid #ddd
          transition: all 0.3s ease
          -webkit-transition: all 0.3s ease
          -moz-transition: all 0.3s ease
        label:after
          content: ''
          position: absolute
          left: -26px
          top: -4px
          display: inline-block
          width: 3px
          height: 6px
          border: 2px solid $color-background
          border-top: none
          border-left: none
          transform: rotate(45deg)
          margin-top: 6px
          margin-left: 6px
          transition: all 0.3s ease
          -webkit-transition: all 0.3s ease
          -moz-transition: all 0.3s ease
        input[type='checkbox']:checked + label:before
          border-color: $color-blue
        input[type='checkbox']:checked + label:after
          border: .2rem solid $color-blue
          border-top: none
          border-left: none
      .link
        font-size :$font-size-small
        padding-left :3rem
        position :absolute
        top :.2rem
        .text-authorization
          color :$color-text-x
        .beyond
          overflow: hidden
          text-overflow:ellipsis
          white-space: nowrap
          width :90%
          display :inline-block
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
    .abandon-loan
      text-align :center
      display :block
      margin-top :2rem
      padding-bottom :5rem
      font-size :$font-size-medium-x
  .confirm-loan-wrapper
    height: 100%
    overflow: hidden
    position :relative
  .input-box
    position: relative
    height: 3rem
    margin-left :1.3rem
    margin-top 1.8rem
    font-size :$font-size-medium
    border-bottom :1px solid $color-border
    input[type="radio"]
      position: absolute
      left: 0
      top: 0
      width: 100%
      height:100%
      opacity: 0
      z-index :20
    label
      padding-left :3rem
      top: 0
      color :$color-text-x
    label:before
      content: ''
      position: absolute
      right :1.5rem
      top: 0
      display: inline-block
      width: 1.5rem
      height: 1.5rem
      border: 1px solid #ddd
      transition: all 0.3s ease
      -webkit-transition: all 0.3s ease
      -moz-transition: all 0.3s ease
    label:after
      content: ''
      position: absolute
      right: 2.1rem
      top: -0.3rem
      display: inline-block
      width: .3rem
      height: .8rem
      border: .2rem solid $color-background
      border-top: none
      border-left: none
      transform: rotate(45deg)
      margin-top: 6px
      margin-left: 6px
      transition: all 0.3s ease
      -webkit-transition: all 0.3s ease
      -moz-transition: all 0.3s ease
    input[type='radio']:checked + label:before
      border-color: $color-blue
      background: $color-background
    input[type='radio']:checked + label:after
      border: .2rem solid $color-blue
      border-top: none
      border-left: none
</style>
