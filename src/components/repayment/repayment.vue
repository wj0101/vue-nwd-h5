<template>
  <transition name="slider">
    <div class="repayment">
      <div class="wapper" v-show="repaymentData">
        <div class="title-repayment" v-for="item in repaymentData" @click="getplan">
          <div class="text">本期应还/第一期 (元)</div>
          <div class="number" v-text="item.money"></div>
          <div class="icon-right-arrow"></div>
        </div>
        <scroll class="list-scroll" :data="repaymentData">
          <div class="list-inner">
            <div class="detailed" v-for="item in repaymentData">
              <div class="top-date mb15" >
                <div class="left-text">还款日期</div>
                <div class="right-num colorBlue" v-text="item.timer"></div>
              </div>
              <div class="top-date borderBt1">
                <div class="left-text ">还款方式</div>
                <div class="right-num">银行卡自动扣款</div>
              </div>
              <div class="top-date">
                <div class="left-text" v-text="item.type"></div>
                <div class="right-num" v-text="item.repayment"></div>
              </div>
              <div class="center-app">
                提前还款请通过&lt;你我贷借款版&gt;app操作
              </div>
            </div>
            <div class="detailed-list" v-for="repayment in repaymentData">
              <div class="left-circular circular"></div>
              <div class="right-circular circular"></div>
              <div class="bottom-border"></div>
              <dl>
                <dt>
                  <div class="left-text" v-text="`${repayment.totalamount} 元`"></div>
                  <div class="right-box">
                    <div class="top-text">借款期限</div>
                    <div class="bottom-text" v-text="repayment.month"></div>
                  </div>
                </dt>
                <dd class="borderBt1" v-for="items in repayment.content">
                  <div class="name-text" v-text="items.album_name"></div>
                  <div class="right-info" v-text="items.album_text"></div>
                </dd>
              </dl>
              <h3 class="telephone-numbers">
                如有疑问，请联系客服400-680-8888
              </h3>
            </div>
          </div>
        </scroll>
        <div class="no-result-wrapper" v-show="noResult">
          <no-result :title="noResultText"></no-result>
        </div>
      </div>
      <preloader v-show="!repaymentData.length"></preloader>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import NoResult from 'base/no-result/no-result'
  import Scroll from 'base/scroll/scroll'
  import Preloader from 'base/preloader/preloader'

  export default {
    data () {
      return {
        currentIndex: 0,
        repaymentData: []
      }
    },
    components: {
      NoResult,
      Scroll,
      Preloader
    },
    computed: {
      noResult () {
        return !this.repaymentData.length
      },
      noResultText () {
        return '您还未有借款计划，申请借款且放款成功后，才需要还款计划'
      }
    },
    methods: {
      getRepaymentData () {
        this.$ajax.get('static/repaymentdata.json?t=' + (new Date()).getTime().toString()).then((response) => {
          this.repaymentData = response.data.list
        }).catch((error) => {
          console.log(error)
        })
      },
      getplan () {
        this.$router.push({
          path: `/repayment/plan`
        })
      }
    },
    created () {
      this.getRepaymentData()
    }
  }
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider-enter-active,.slider-leave-active
    transition :all 0.3s

  .slider-enter,.slider-leave-to
    transform :translate3D(100%,0,0)
  .borderBt1
    border-bottom :1px solid $color-border
  .repayment
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color :$color-background
    .title-repayment
      height :9rem
      background-image:-webkit-linear-gradient(to top, #5a67ee, #8286ff)
      background-image:linear-gradient(to top,#5a67ee,#8286ff)
      display: flex
      flex-direction: column
      align-items: center
      justify-content:center
      line-height:2
      color :#fff
      position :relative
      .text
        font-size :$font-size-medium
      .number
        font-size :$font-size-large-x
        letter-spacing :.1rem
      .icon-right-arrow
        border-right: 0.2rem solid #fff;
        border-top: 0.2rem solid #fff;
        height: 1.2rem;
        width: 1.2rem;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        border-left: 0.2rem solid transparent;
        border-bottom: 0.2rem solid transparent;
        display: inline-block;
        margin-right: 1.5rem;
        position :absolute
        right :0
        top :50%
        margin-top :-.6rem
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 40%
      transform: translateY(-50%)
      z-index :110
  .detailed
    .mb15
      margin-bottom :1.5rem
    .top-date
      display: flex
      flex-direction: row
      justify-content:space-between
      padding :1.8rem
      height :5rem
      background-color :#fff
      font-size :$font-size-medium
      .colorBlue
        color :$color-blue
    .center-app
      padding :1.8rem 0
      text-align :center
      font-size :$font-size-medium
      color :$color-text-orange
  .detailed-list
    margin :0 1.8rem
    background-color :#fff
    position :relative
    .circular
      width :2rem
      height :2rem
      background-color :$color-background
      border-radius :50%
      position :absolute
      top :7rem
    .left-circular
      left :-1rem
    .right-circular
      right :-1rem
    .bottom-border
      position :absolute
      bottom :0
      width: 100%;
      height: 2rem;
      background-image:-webkit-gradient(linear,50% 20%,0 100%,from(transparent), color-stop(.5,transparent),color-stop(.5,#f6f6f6),to(#f6f6f6)),
        -webkit-gradient(linear,50% 20%,100% 100%,from(transparent), color-stop(.5,transparent),color-stop(.5,#f6f6f6),to(#f6f6f6))
      background-size: 1.5rem 1rem;
      background-repeat: repeat-x;
      background-position: 0 100%;
    dt
      display: flex
      flex-direction: row
      justify-content:space-between
      padding :2rem 2rem
      align-items:flex-end
      font-size :$font-size-medium
      line-height :1.5
      .left-text
        font-size :$font-size-medium-x
      .top-text
        color :$color-text-x
      .right-box
        display: flex
        flex-direction:column
        .bottom-text
          font-size :$font-size-medium-x
    dd
      display: flex
      flex-direction: row
      justify-content:space-between
      padding :2rem 0
      font-size :$font-size-medium
      margin :0 2rem
      .name-text
        color :$color-text-x
  .telephone-numbers
    text-align :center
    font-size :$font-size-medium
    color :$color-text-x
    padding :2rem 0 4rem 0
  .list-scroll
    position: fixed
    width: 100%
    top :9rem
    bottom :0
    z-index :100
    overflow :hidden
</style>
