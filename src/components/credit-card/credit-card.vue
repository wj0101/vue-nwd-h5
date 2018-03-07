<template>
  <transition name="slider">
    <div class="credit-card">
      <div class="card-wrapper">
        <div class="title">
          <div class="top-text">请选择一张信用卡</div>
          <div class="bottom-text">本卡为收款卡，为确保资金发放成功，银行卡需在本人名下</div>
        </div>
        <ul>
          <li v-for="(items,index) in bankData" @click="handler(index)">
            <div class="left-img">
              <img src="./icon.jpg"/>
            </div>
            <div class="text-center">
              <div class="bank">
                <span>{{items.type}}</span>
                （****<span>{{items.totalamount}}</span>）
              </div>
              <div class="num">{{items.text}}</div>
            </div>
            <div :class="{'icon-right-adopt':classItem === index}"></div>
          </li>
        </ul>
        <div class="add-card" @click="cardInfoPage">
          <span class="plus">+</span>
          <i class="text">添加信用卡</i>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  export default {
    methods: {
      getBank () {
        this.$ajax.get('/static/carddata.json?t=' + (new Date()).getTime().toString()).then((response) => {
          this.bankData = response.data.list
        }).catch((error) => {
          console.log(error)
        })
      },
      handler (index) {
        this.classItem = index
      },
      cardInfoPage () {
        this.$router.push('/recommend/card/personal-data/credit-card/card-info')
      }
    },
    created () {
      this.getBank()
    },
    data () {
      return {
        bankData: [],
        classItem: ''
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

  .credit-card
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color :$color-background
    .card-wrapper
      .title
        .top-text
          padding :1.5rem 1.5rem 1rem 1.5rem
          font-size :$font-size-medium
        .bottom-text
          color :$color-coupon-orange
          padding :0 1.5rem 1.5rem 1.5rem
          font-size :$font-size-small-s
      ul
        li
          background-color :#fff
          display :flex
          flex-direction:row
          justify-content: flex-start
          position :relative
          border-bottom :1px solid $color-border
          height :9rem
          .left-img
            -ms-transform: scale(0.5)
            -webkit-transform: scale(0.5)
            transform: scale(0.5)
            vertical-align: middle
            img
              width: auto
              height: auto
              max-width: 100%
              max-height: 100%
          .text-center
            line-height :1.5
            font-size :$font-size-medium
            padding:2.5rem 2.5rem 2.5rem 0
            text-indent :-1rem
            .num
              font-size :$font-size-small
              color :$color-text-x
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
</style>
