<template>
  <transition name="slider">
    <div class="coupon">
      <scroll :data="couponData" class="coupon-wrapper">
       <div class="inner">
         <ul>
           <li v-for="item in couponData" :class="colorBG(item)">
             <div class="circular top-left"></div>
             <div class="circular top-right"></div>
             <div class="circular bottom-left"></div>
             <div class="circular bottom-right"></div>
             <div class="stamp" v-if="item.state !== 0">
               <span class="text" v-text="stateText(item)"></span>
             </div>
             <div class="title" v-if="!item.attribute" v-text="item.type"></div>
             <div class="box" v-if="item.attribute">
               <div class="num"> &yen;<span>{{item.totalamount}}</span></div>
               <div class="right-text">
                 <div class="name" v-text="item.type"></div>
                 <div class="timer" v-text="`过期时间:${item.time}`"></div>
               </div>
             </div>
             <p v-if="!item.attribute" v-text="`过期时间:${item.time}`"></p>
             <p v-text="usageMethod(item)"></p>
             <p>备注：提前或逾期还款不可用</p>
           </li>
         </ul>
       </div>
      </scroll>
      <preloader v-show="!couponData.length"></preloader>
      <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="noResultText" :text="backText"></no-result>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import NoResult from 'base/no-result/no-result'
  import Preloader from 'base/preloader/preloader'

  export default {
    data () {
      return {
        couponData: []
      }
    },
    components: {
      Scroll,
      NoResult,
      Preloader
    },
    computed: {
      noResult () {
        return !this.couponData.length
      },
      noResultText () {
        return '您暂时没有抵用券'
      },
      backText () {
        return '返回上一页'
      }
    },
    methods: {
      usageMethod (item) {
        if (item.attribute) {
          return '使用方法：还款时系统直接抵扣，无限不可叠加'
        } else {
          return '使用方法：还款时系统直接免息，无限不可叠加'
        }
      },
      getCouponData () {
        this.$ajax.get('static/coupondata.json?t=' + (new Date()).getTime().toString()).then((response) => {
          this.couponData = response.data.list
        }).catch((error) => {
          console.log(error)
        })
      },
      colorBG (item) {
        if (item.state === 1) {
          return 'red'
        } else if (item.state === 2) {
          return 'none'
        } else if (item.state === 3) {
          return 'none'
        }
      },
      stateText (item) {
        if (item.state === 0) {
          return ''
        } else if (item.state === 1) {
          return '使用中'
        } else if (item.state === 2) {
          return '已使用'
        } else if (item.state === 3) {
          return '已过期'
        }
      }
    },
    created () {
      this.getCouponData()
    }
  }
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider-enter-active,.slider-leave-active
    transition :all 0.3s

  .slider-enter,.slider-leave-to
    transform :translate3D(100%,0,0)
  .coupon
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color :$color-background
    ul
      padding-bottom :5rem
      li
        margin :1rem 1rem 0 1rem
        border :.9rem solid $color-coupon-orange
        color : $color-coupon-orange
        box-sizing : border-box
        padding :1.5rem
        display: flex
        flex-direction: column
        font-size : $font-size-medium
        line-height :1.5
        position :relative
        .stamp
          width :4rem
          height :4rem
          border-radius :50%
          border :.2rem solid $color-coupon-orange
          position :absolute
          right :1rem
          top :1rem
          line-height :3.5rem
          text-align :center
          .text
            font-size :1rem
            transform:rotate(-15deg)
            display :inline-block
        .title
          text-align :center
          font-size :$font-size-large-x
          padding-bottom :1rem
        .circular
          width :1rem
          height :1rem
          background-color :$color-coupon-orange
          position :absolute
        .top-left
          left :0
          top :0
          border-bottom-right-radius:1rem
        .top-right
          right :0
          top :0
          border-bottom-left-radius:1rem
        .bottom-right
          right :0
          bottom :0
          border-top-left-radius:1rem
        .bottom-left
          left :0
          bottom :0
          border-top-right-radius:1rem
        .box
          display: flex
          flex-direction: row
          justify-content: space-between
          padding-bottom :1rem
          align-items: flex-end
          padding-right :4rem
          span
            font-size :$font-size-large-xl
          .right-text
            .name
              font-size :$font-size-large
    .red
      color : $color-text-red
      border :.9rem solid $color-text-red
      .circular
        background-color :$color-text-red
      .stamp
        border :.2rem solid $color-blue
        color :$color-blue
    .none
      color : $color-coupon-none
      border :.9rem solid $color-coupon-none
      .circular
        background-color :$color-coupon-none
      .stamp
        border :.2rem solid $color-coupon-none
  .coupon-wrapper
    height: 100%
    overflow: hidden
    position :relative
  .no-result-wrapper
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
