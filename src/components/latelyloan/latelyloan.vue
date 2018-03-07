<template>
  <div class="list">
    <div class="details">
      <ul class="layer">
        <li class="item" v-for="items in latelyLoanData">
          <h3 class="title" v-html="items.productname"></h3>
          <div class="box border-bottom">
            <div class="amount">
              <div class="text">申请金额</div>
              <p class="num" v-html="items.money"></p>
            </div>
            <div class="content">
              <div class="text">借款期限</div>
              <p class="timer" v-html="items.monthall"></p>
            </div>
          </div>
          <div class="box pt10">
            <div class="amount">
              <div class="text">还款卡</div>
              <p class="cardText" v-html="items.repayment"></p>
            </div>
            <div class="content">
              <div class="text">到账卡</div>
              <p class="timer" v-html="items.arrival"></p>
            </div>
          </div>
        </li>
      </ul>
      <div class="detail"  v-for="items in latelyLoanData">
        <h3 class="titleText">借款进度</h3>
        <div class="result">
          <div class="rightStrip">
            <div class="line" v-for="(item,index) in items.content">
              <div class="top circular" :class="getRankIcon(index)"></div>
            </div>
          </div>
          <div class="leftTimer" >
            <div class="topList" v-for="(item,index) in items.content">
              <div class="submit clearfix">
                <span class="fl" v-html="item.album_name"></span>
                <span class="fr" v-html="getdata (item)"></span>
              </div>
              <p v-html="item.album_text"></p>
            </div>
          </div>
        </div>
        <div class="btn-bottom">
          <div class="back" @click="goBack">
            <span>返回首页</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      latelyLoanData: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        currentLineNum: 0
      }
    },
    methods: {
      goBack () {
        this.$router.back()
      },
      getdata (item) {
        return `${item.album_year} ${item.album_timer}`
      },
      getRankIcon (index) {
        return index + 1
      },
      line (index) {
        this.currentLineNum = this.currentLoan.content.length + 1
        if (this.currentLineNum === index + 1) {
          return 'bottom'
        } else {
          return ''
        }
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
    .layer
      .item
        font-size 1.4rem
        align-items: center;
        background-color :#fff
        margin-bottom :1.5rem
        .title
          flex :1
          flex: 0 0 100%
          padding :1.3rem
        .box
          display :flex
          flex-direction:row
        .border-bottom
          border-bottom :1px solid $color-border
        .pt10
          padding-top :1.5rem
        .amount
          fiex:1;
          flex: 0 0 40%;
          .text
            white-space: nowrap;
            padding :0 0 1.5rem 1.3rem
            color :$color-text-x
            font-size :$font-size-small
          .num
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            padding :0 0 1.5rem 1.3rem
            font-size :$font-size-large
            color :$color-blue
          .cardText
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            padding :0 0 1.5rem 1.3rem
            font-size :$font-size-medium-x
        .content
          fiex:1;
          flex: 0 0 50%;
          text-align :right
          .text
            white-space: nowrap
            padding :0 0 1.5rem 1.3rem
            color :$color-text-x
            font-size :$font-size-small
          .timer
            padding :0 0 1.5rem 1.3rem
            white-space: nowrap
            color :$color-text
            font-size :$font-size-medium-x
  .detail
    margin-bottom :1.5rem
    background-color: #fff
    .titleText
      color :$color-text-x
      font-size :$font-size-small
      padding :1.3rem
    .result
      display :flex
      flex-direction:row
      justify-content: space-between
      .rightStrip
        flex: 0 0 15%
        width :15%
        margin-bottom :1rem
        margin-top :2rem
        .line
          border-right :.2rem solid #eee
          height :6rem
          margin :0 auto
          width :.2rem
          position :relative
          .circular
            width :1rem
            height :1rem
            border-radius :50%
            background-color :$color-blue
            left :50%
            margin-left :-.5rem
            position :absolute
            -webkit-box-shadow:0 0 0 5px rgba(84,98,235,0.3)
            -moz-box-shadow:0 0 0 5px rgba(84,98,235,0.3)
            box-shadow:0 0 0 5px rgba(84,98,235,0.3)
        .top
          top: 50%
          margin-top :-.7rem
        .bottom
          bottom:0
        .line:last-child
          height :3rem
          .circular
            top :100%
        .line:first-child
          height :3rem
          .circular
            top :0
            background-color :#ff4e4e
            -webkit-box-shadow:0 0 0 5px rgba(255,78,78,0.3)
            -moz-box-shadow:0 0 0 5px rgba(255,78,78,0.3)
            box-shadow:0 0 0 5px rgba(255,78,78,0.3)
      .leftTimer
        flex: 0 0 75%
        flex: 1
        width :70%
        .topList
          padding :1rem 0 1rem 0
          margin-right :2rem
          font-size: $font-size-small
          border-bottom :1px solid $color-border
          height :6rem
          .submit
            padding-bottom :1.5rem
          p
            text-overflow: ellipsis
            overflow: hidden
            white-space: nowrap
            color :$color-text-x
  .numText
    color :$color-text
    font-size :$font-size-small
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
    margin-right: 1rem;
  &.normal-enter-active, &.normal-leave-active
    transition: all 0.4s
    .layer, .detail, .back
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
  &.normal-enter, &.normal-leave-to
    opacity: 0
    .layer
      transform: translate3d(0, -100px, 0)
    .detail, .back
      transform: translate3d(0, 100px, 0)
  .btn-bottom
    padding-bottom :5rem
    .back
      width:30rem
      height:5rem
      background-color :$color-blue
      margin :2rem auto 2rem auto
      line-height :5rem
      border-radius :.4rem
      span
        color :#fff
        font-size :$font-size-medium-x
        text-align :center
        display :block
</style>

