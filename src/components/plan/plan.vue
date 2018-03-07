<template>
  <transition name="slider">
    <div class="plan">
      <scroll class="list-scroll" :data="statData">
        <div class="list-inner">
          <div class="top-content" v-for="item in statData">
            <div class="left-text">
              <div class="title">总共应还(元)</div>
              <div class="num"  v-text="item.totalamount"></div>
            </div>
            <div class="right-text">
              <div class="title">剩余应还(元)</div>
              <div class="num" v-text="item.surplus">3200.00</div>
            </div>
          </div>
          <div class="content" v-for="items in statData">
            <dl>
              <dt class="borderBt1">
                <div class="plan-text">还款计划</div>
                <div class="total">总额(元)/还款状态</div>
              </dt>
              <dd class="borderBt1" v-for="item in items.content">
                <div class="left-timer">
                  <div class="timer" v-text="item.album_name"></div>
                  <div class="date" v-text="item.album_time"></div>
                </div>
                <div class="right-money">
                  <div class="number" v-text="item.album_num" :class="{'notice':item.album_attribute === false}"></div>
                  <div class="state" v-text="item.album_state" :class="{'notice':item.album_attribute === false}"></div>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </scroll>
      <preloader v-show="!statData.length"></preloader>
      <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="noResultText"></no-result>
      </div>
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
        statData: []
      }
    },
    components: {
      NoResult,
      Scroll,
      Preloader
    },
    computed: {
      noResult () {
        return !this.statData.length
      },
      noResultText () {
        return '您还未有借款计划，申请借款且放款成功后，才需要还款计划'
      }
    },
    methods: {
      getStateData () {
        this.$ajax.get('static/statedata.json?t=' + (new Date()).getTime().toString()).then((response) => {
          this.statData = response.data.list
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    created () {
      this.getStateData()
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
  .plan
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color :$color-background
    .top-content
      display: flex
      flex-direction: row
      justify-content:space-between
      padding :1.2rem
      line-height :1.5
      background-color :#fff
      .left-text
        .title
          font-size :$font-size-medium
          color :$color-text-x
        .num
          font-size :$font-size-medium-x
      .right-text
        .title
          font-size :$font-size-medium
          color :$color-text-x
        .num
          font-size :$font-size-medium-x
          color :$color-blue
    .content
      margin-top :1.5rem
      padding-bottom :6rem
      dl
        background-color :#fff
        dt
          display: flex
          flex-direction: row
          justify-content:space-between
          padding :1.3rem
          font-size :$font-size-medium
          color :$color-text-x
        dd
          display: flex
          flex-direction: row
          justify-content:space-between
          padding :1.3rem 1.3rem 1.3rem 0
          margin :0 0 0 1.3rem
          line-height 1.5
          .left-timer
            .timer
              font-size :$font-size-large
            .date
              font-size :$font-size-medium
              color :$color-text-x
          .right-money
            .number
              font-size :$font-size-large
            .state
              font-size :$font-size-medium
              color :$color-blue
            .notice
              color :$color-text-red
  .list-scroll
    height: 100%;
    overflow: hidden;
    position: relative;
  .no-result-wrapper
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
