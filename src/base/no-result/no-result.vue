<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <p class="no-result-text">{{title}}</p>
    <div class="back" @click="black">
      <span>{{text}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: '返回首页'
      }
    },
    methods: {
      black () {
        this.$router.back()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .no-result
    text-align: center
    .no-result-icon
      width: 15rem
      height: 12rem
      margin: 0 auto
      background-image :url(empty.png)
      background-size: 15rem 12rem
    .no-result-text
      margin: 3rem 4rem 0 4rem
      font-size: $font-size-medium
      color: $color-text-x
      line-height :1.5
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
</style>
