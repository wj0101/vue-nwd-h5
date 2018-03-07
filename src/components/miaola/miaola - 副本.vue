<template>
  <transition name="slider">
    <div class="miaola">
      <scroll class="wrapper" ref="wrapper">
        <div class="inner">
          <div class="title-image">
            <img src="./miaola.png" alt="秒啦" @load="imgBS">
          </div>
          <form @submit.prevent="submit">
            <div class="content">
              <div class="title">借款金额(元)</div>
              <div class="text-num">{{currentValue}}</div>
              <div class="progress-wrapper">
                <progress-bar @percentChange="onProgressBarChange" :percent="percent" :percentmin="nummin" :percentmax="nummax" :percentum="percentage"></progress-bar>
                <div class="num-range">
                  <div class="left-num">1000(元)</div>
                  <div class="right-num">8000(元)</div>
                </div>
              </div>
              <div class="month">
                <div class="title">借款期限</div>
                <div class="mycheck">
                  <input type="checkbox" value="24" id="checkbox1" checked="true" />
                  <label for="checkbox1">
                    12个月
                  </label>
                </div>
              </div>
            </div>
            <div class="purpose" @click.stop="showSelectThis(0,$event)">
              <div class="text">借款用途</div>
              <div class="choice">
                <span>{{purposeValue}}</span>
                <div class="icon-right-arrow"></div>
              </div>
            </div>
            <choice :text="purposeData" ref="choice" @getchoice="onChoiceThis" @cancel="showToggleCancel" :checkedValue="checkPurpose"></choice>
            <p class="warning-text" v-show="showWarning">根据监管规则，无指定用途不放款</p>
            <div class="product-details" @click.stop="showProduct">
              <div class="text">产品详情</div>
              <div class="icon-right-arrow"></div>
            </div>
            <div class="button" ref="btnPD">
              <button type="submit" class="btn">立即申请</button>
            </div>
          </form>
        </div>
      </scroll>
      <popup ref="popup" @picked="onQicked" :pickedValue="defaultValue"></popup>
      <prompt :message="messageText" ref="prompt"></prompt>
      <popup-product-miaola ref="product"></popup-product-miaola>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import ProgressBar from 'base/progress-bar/progress-bar'
  import Popup from 'base/popup/popup'
  import Prompt from 'base/prompt/prompt'
  import PopupProductMiaola from 'base/popup-product-miaola/popup-product-miaola'
  import {mapGetters, mapMutations} from 'vuex'
  import Choice from 'base/choice/choice'
  import Scroll from 'base/scroll/scroll'

  export default {
    data () {
      return {
        currentValue: null,
        purposeValue: '请选择',
        max: 8000,
        min: 1000,
        term: '12',
        messageText: '',
        useNum: 3000,
        defaultValue: '',
        nummin: 10,
        nummax: 80,
        purposeData: [
          {
            name: '个人生活消费',
            id: 1,
            radioName: 'purpose'
          },
          {
            name: '租房装修',
            id: 2,
            radioName: 'purpose'
          },
          {
            name: '电子数码',
            id: 3,
            radioName: 'purpose'
          },
          {
            name: '旅游',
            id: 4,
            radioName: 'purpose'
          },
          {
            name: '无指定用途',
            id: 5,
            radioName: 'purpose'
          }
        ],
        checkPurpose: '',
        isShow: true,
        showWarning: false,
        collapse: [
          {
            show: false
          }
        ]
      }
    },
    components: {
      ProgressBar,
      Popup,
      Prompt,
      PopupProductMiaola,
      Choice,
      Scroll
    },
    computed: {
      percentage () {
        return this.min / this.max
      },
      percent () {
        return this.useNum / this.max
      },
      ...mapGetters([
        'idValidate'
      ])
    },
    created () {
      this.currentValue = parseFloat(this.useNum).toLocaleString()
      this.getPopup()
      this.addevent()
    },
    methods: {
      imgBS () {
        this.$refs.wrapper.refresh()
      },
      addevent () {
        document.addEventListener('tap', this._currentData, true)
      },
      _currentData (event) {
        var focusTargetDom = event.target
        if (focusTargetDom.tagName.toLowerCase() === 'input' && focusTargetDom.getAttribute('name') === 'purpose') {
          this.checkPurpose = focusTargetDom.value
          localStorage.setItem('checkPurpose', this.checkPurpose)
          this.getcheckPurpose(focusTargetDom.value)
        }
      },
      showToggleCancel () {
        if (this.checkPurpose === '5') {
          return
        } else {
          this.$refs.choice.hide()
          this.isShow = true
        }
      },
      onChoiceThis (value) {
        if (value === 1) {
          this.purposeValue = '个人生活消费'
        } else if (value === 2) {
          this.purposeValue = '租房装修'
        } else if (value === 3) {
          this.purposeValue = '电子数码'
        } else if (value === 4) {
          this.purposeValue = '旅游'
        } else if (value === 5) {
          this.purposeValue = '无指定用途'
        }
      },
      getcheckPurpose (val) {
        if (val === '1') {
          this.purposeValue = '个人生活消费'
          this.showWarning = false
        } else if (val === '2') {
          this.purposeValue = '租房装修'
          this.showWarning = false
        } else if (val === '3') {
          this.purposeValue = '电子数码'
          this.showWarning = false
        } else if (val === '4') {
          this.purposeValue = '旅游'
          this.showWarning = false
        } else if (val === '5') {
          this.purposeValue = '无指定用途'
          this.showWarning = true
        }
      },
      getPopup () {
        this.defaultValue = '2'
        if (this.defaultValue === '1') {
          this.purposeValue = '个人生活消费'
        } else if (this.defaultValue === '2') {
          this.purposeValue = '租房装修'
        } else if (this.defaultValue === '3') {
          this.purposeValue = '电子数码'
        } else if (this.defaultValue === '4') {
          this.purposeValue = '旅游'
        } else if (this.defaultValue === '5') {
          this.purposeValue = '无指定用途'
        }
      },
      onProgressBarChange (percent) {
        this.useNum = percent * 100
        this.currentValue = parseFloat(this.useNum).toLocaleString()
      },
      showSelectThis (num, event) {
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
        let children = ulElement.getElementsByTagName('div')[0]
        ulElement.style.height = children.offsetHeight + 'px'
        setTimeout(() => {
          ulElement.style.height = '0px'
          setTimeout(() => {
            ulElement.style.display = 'none'
            this.$refs.wrapper.refresh()
          }, 300)
        }, 10)
      },
      openCollapse (event) {
        let ulElement = event.currentTarget.nextElementSibling
        let children = ulElement.getElementsByTagName('div')[0]
        ulElement.style.display = 'block'
        console.log(children.offsetHeight)
        ulElement.style.height = children.offsetHeight + 'px'
        setTimeout(() => {
          ulElement.style.height = 'auto'
          this.$refs.wrapper.refresh()
        }, 300)
      },
      showProduct () {
        this.$refs.product.show()
      },
      onQicked (value) {
        if (value === 1) {
          this.purposeValue = '个人生活消费'
        } else if (value === 2) {
          this.purposeValue = '租房装修'
        } else if (value === 3) {
          this.purposeValue = '电子数码'
        } else if (value === 4) {
          this.purposeValue = '旅游'
        } else if (value === 5) {
          this.purposeValue = '无指定用途'
        }
      },
      submit () {
        if (this.purposeValue === '请选择') {
          this.$refs.prompt.show()
          this.messageText = '请选择借款用途'
          setTimeout(() => {
            this.$refs.prompt.close()
          }, 3000)
        } else {
          this.$router.push('/recommend/miaola/personal-data')
        }
      },
      postdata () {
        this.$ajax.post('/static/post.json', {
          'term': this.term,
          'num': this.currentValue,
          'purpose': this.purposeValue
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response) => {
          this.$router.push('/recommend/miaola/personal-data')
        }).catch((error) => {
          console.log(error)
        })
      },
      getIdData () {
        if (!this.idValidate) {
          this.$router.push('/validate')
        } else {
          this.$router.push('/recommend/miaola/personal-data')
        }
      },
      ...mapMutations({
        setChoiceShowMiao: 'SET_CHOICE_SHOW_MIAO'
      })
    }
  }
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider-enter-active,.slider-leave-active
    transition :all 0.3s

  .slider-enter,.slider-leave-to
    transform :translate3D(100%,0,0)

  .miaola
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color :$color-background
    .content
      text-align :center
      line-height :1.5
      background-color :#fff
      padding-top :2rem
      padding-bottom :1rem
      .title
        font-size :$font-size-medium
        color :$color-text-x
        padding-bottom :1rem
      .text-num
        font-size :$font-size-large-xl
        color :$color-blue
      .progress-wrapper
        align-items: center
        width: 80%
        margin: 0 auto
        padding: 1rem 0 2rem 0
        .num-range
          display: flex
          flex-direction:row
          justify-content: space-between
          padding-top :1rem
          font-size :$font-size-small
          color :$color-text-x
      .month
        background-color :#fff
        padding :3rem
        border-top :1px solid $color-border
        .title
          padding-bottom :2rem
        .mycheck
          position: relative
          left :50%
          margin-left :-3.3rem
          width :6.6rem
          height :4.3rem
          input[type=checkbox]
            visibility: hidden
          label
            cursor: pointer
            position: absolute
            top: 0
            left: 0
            background: #fff
            border:1px solid #ccc
            -moz-border-radius: 3px
            -webkit-border-radius: 3px
            border-radius:3px
            text-align:center
            padding: 1rem
            font-size :$font-size-medium
          label:after
            opacity: 0
            content: ''
            position:absolute
            top: -2px
            left: -2px
          input[type=checkbox]:checked + label:after
            opacity: 1
          input[type=checkbox]:checked + label
            color: $color-blue
            border:1px solid $color-blue
    .purpose
      display :flex
      flex-direction: row
      justify-content :space-between
      padding :1.5rem
      margin-top :1.5rem
      background-color :#fff
      font-size :$font-size-medium
      .choice
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
    .warning-text
      padding-left :1.5rem
      color:$color-text-red
      font-size :$font-size-medium
    .product-details
      display :flex
      flex-direction: row
      justify-content :space-between
      padding :1.5rem
      margin-top :1.5rem
      background-color :#fff
      font-size :$font-size-medium
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
  .wrapper
    height: 100%
    overflow: hidden
    position :relative
  .title-image
    img
      width :100%
      display :block
      height :auto
</style>
