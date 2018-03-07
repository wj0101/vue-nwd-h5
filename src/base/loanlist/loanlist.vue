<template>
  <div class="loanlist">
    <ul>
      <li class="item" v-for="(item,index) in loanData" @click.stop="selectIndex(item,index)">
        <h3 class="title">{{item.productname}}</h3>
        <div class="box">
          <div class="amount">
            <div class="text">申请金额</div>
            <p class="num">{{item.money}}</p>
          </div>
          <div class="content">
            <div class="text">借款期限:<span class="numText">{{item.monthall}}</span></div>
            <p class="timer">申请时间:<span class="numText">{{getdata(item)}}</span> </p>
          </div>
          <div class="icon-right-arrow"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      loanData: {
        type: Array,
        default: []
      }
    },
    methods: {
      selectIndex (item, index) {
        this.$emit('select', item, index)
      },
      getdata (item) {
        return `${item.month} ${item.timer}`
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .loanlist
    .item
      font-size 1.4rem
      align-items: center
      background-color :#fff
      margin-bottom :1.5rem
      .title
        flex :1
        flex: 0 0 100%
        padding :1.3rem
      .box
        display :flex
        flex-direction:row
      .amount
        fiex:1
        flex: 0 0 40%
        .text
          white-space: nowrap
          padding :0 0 1.5rem 1.3rem
          color :$color-text-x
          font-size :$font-size-small
        .num
          text-overflow: ellipsis
          overflow: hidden
          white-space: nowrap
          padding :0 0 1.5rem 1.3rem
          font-size :$font-size-large
          color :$color-blue
      .content
        fiex:1
        flex: 0 0 50%
        .text
          white-space: nowrap
          padding :0 0 1.5rem 1.3rem
          color :$color-text-x
        .timer
          padding :0 0 1.5rem 1.3rem
          white-space: nowrap
          color :$color-text-x
  .numText
    color :$color-text
    font-size :$font-size-small
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
    margin-right: 1rem
</style>

