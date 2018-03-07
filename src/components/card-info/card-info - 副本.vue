<template>
  <transition name="slider">
    <div class="card-info">
      <div class="inner">
        <div class="title">
          本卡为收款卡,需在本人名下
        </div>
        <form>
          <div class="inputText">
            <div class="text left15">信用卡卡号</div>
            <input type="tel" name="card" value="" placeholder="请输入信用卡卡号" class="address" maxlength="11" v-model="cardNum">
          </div>
          <div class="choice">
            <div class="text">开户行</div>
            <div class="choice-info">
              <span>{{bankAdd}}</span>
              <div class="icon-right-arrow"></div>
            </div>
          </div>
          <div class="choice" @click.stop="showCity">
            <div class="text">居住地址</div>
            <div class="choice-info">
              <span>{{aggregateShow()}}</span>
              <div class="icon-right-arrow"></div>
            </div>
          </div>
        </form>
      </div>
      <city ref="city" @getDistrict="valDistrict" @getCity="valCity" @getProvince="valProvince"></city>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import City from 'base/city/city'

  export default {
    data () {
      return {
        cardNum: '',
        bankAdd: '选择开户行',
        area: '开户行所在省市'
      }
    },
    methods: {
      showCity () {
        this.$refs.city.showAdd()
      },
      aggregateShow () {
        return `${this.province} ${this.city} ${this.area}`
      }
    },
    components: {
      City
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
    .inner
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
</style>
