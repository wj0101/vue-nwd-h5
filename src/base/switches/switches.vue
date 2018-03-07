<template>
  <ul class="switches">
    <li class="switch-item" v-for="(item, index) in switches" :class="{'active':currentIndex === index}" @click="switchitem(index)">
      <span>{{item.name}}</span>
      <span class="bottom-line"></span>
      <span class="right-line"></span>
    </li>
  </ul>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      switches: {
        type: Array,
        default: []
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      switchitem (index) {
        this.$emit('switch', index)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .switches
    display: flex
    align-items: center
    width: 100%
    margin: 0 auto
    background-color :#fff
    height :5rem
    box-sizing :border-box
    .switch-item
      flex: 1
      text-align: center
      font-size: $font-size-medium-x
      color: $color-text-d
      padding: 1.6rem 0
      margin :0 4rem
      position:relative
      &.active .bottom-line
        border-bottom :2px solid $color-blue
        width :10rem
        height :.2rem
        background :$color-blue
        position :absolute
        bottom :0
        left :50%
        margin-left :-5rem
      .right-line
        border-right :1px solid #999
        height 2rem
        position :absolute
        right :-4.1rem
</style>
