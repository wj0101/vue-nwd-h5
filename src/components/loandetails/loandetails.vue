<template>
  <div class="list" v-show="loanList.length > 0">
    <transition name="normal">
      <div class="details" v-show="fullScreen">
        <ul class="layer">
          <li class="item">
            <h3 class="title" v-html="currentLoan.productname"></h3>
            <div class="box">
              <div class="amount">
                <div class="text">申请金额</div>
                <p class="num" v-html="currentLoan.money"></p>
              </div>
              <div class="content">
                <div class="text">借款期限</div>
                <p class="timer" v-html="currentLoan.monthall"></p>
              </div>
            </div>
          </li>
        </ul>
        <scroll class="list-detail" :data="currentLoan.content">
          <div class="list-wrapper-loan">
            <div class="detail">
              <h3 class="titleText">借款进度</h3>
              <div class="result">
                <div class="rightStrip">
                  <div class="line" v-for="(item,index) in currentLoan.content">
                    <div class="top circular" :class="getRankIcon(index)"></div>
                  </div>
                </div>
                <div class="leftTimer" >
                  <div class="topList" v-for="(item,index) in currentLoan.content">
                    <div class="submit clearfix">
                      <span class="fl" v-html="item.album_name"></span>
                      <span class="fr" v-html="getdata (item)"></span>
                    </div>
                    <p v-html="item.album_text"></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn-bottom">
              <div class="back" @click.stop="goBack">
                <span>返回上一页</span>
              </div>
            </div>
          </div>
        </scroll>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import Scroll from 'base/scroll/scroll'
  import BorrowingProgress from 'base/borrowing-progress/borrowing-progress'

  export default {
    data () {
      return {
        currentLineNum: 0
      }
    },
    components: {
      Scroll,
      BorrowingProgress
    },
    computed: {
      ...mapGetters([
        'fullScreen',
        'loanList',
        'currentLoan'
      ])
    },
    methods: {
      goBack () {
        this.setFullScreen(false)
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
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN'
      })
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .details
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 150
    background: $color-background
    .layer
      position:relative
      top :1.5rem
      z-index: 103
      .item
        font-size 1.4rem
        align-items: center
        background-color :#fff
        .title
          flex :1
          flex: 0 0 100%
          padding :1.3rem
        .box
          display :flex
          flex-direction:row
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
            font-size :$font-size-large
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
      margin :2rem auto
      line-height :5rem
      border-radius :.4rem
      span
        color :#fff
        font-size :$font-size-medium-x
        text-align :center
        display :block
  .list-detail
    position: fixed
    width: 100%
    top :13.2rem
    bottom :0
    z-index :100
    overflow :hidden
</style>

