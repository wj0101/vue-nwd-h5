<template>
  <transition name="normal">
    <div class="preloader">
      <div class="inner">
        <span class="loader"></span>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  export default {
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .normal-enter-active, .normal-leave-active
    transition: all 0.4s
  .normal-enter, .normal-leave-to
    opacity: 0

  .preloader
    position:fixed
    z-index:9999999
    top:0
    bottom:0
    right:0
    left:0
    opacity :.9
    .inner
      position:absolute
      top:0
      bottom:0
      right:0
      left:0
      width:5rem
      height:5rem
      background-color :rgba(102,102,102,.8)
      border-radius :.5rem
      margin:auto
      .loader{
        width:3.6rem
        height:3.6rem
        position:absolute
        top:50%
        left:50%
        margin:-1.8rem 0 0 -1.8rem
        font-size:10px
        text-indent:-12345px
        border-top:1px solid rgba(176,176,176,.9)
        border-right:1px solid rgba(176,176,176,.9)
        border-bottom:1px solid rgba(176,176,176,.9)
        border-left:1px solid rgba(254,254,254,.9)
        -webkit-border-radius:50%
        -moz-border-radius:50%
        border-radius:50%
        -webkit-animation:spinner .7s infinite linear
        -moz-animation:spinner .7s infinite linear
        -ms-animation:spinner .7s infinite linear
        -o-animation:spinner .7s infinite linear
        animation:spinner .7s infinite linear
        z-index:100001}
  @-webkit-keyframes spinner
    0%
      -webkit-transform:rotate(0)
      -moz-transform:rotate(0)
      -ms-transform:rotate(0)
      -o-transform:rotate(0)
      transform:rotate(0)
    100%
      -webkit-transform:rotate(360deg)
      -moz-transform:rotate(360deg)
      -ms-transform:rotate(360deg)
      -o-transform:rotate(360deg)
      transform:rotate(360deg)

  @-moz-keyframes spinner
    0%
      -webkit-transform:rotate(0)
      -moz-transform:rotate(0)
      -ms-transform:rotate(0)
      -o-transform:rotate(0)
      transform:rotate(0)
    100%
        -webkit-transform:rotate(360deg)
        -moz-transform:rotate(360deg)
        -ms-transform:rotate(360deg)
        -o-transform:rotate(360deg)
        transform:rotate(360deg)

  @-o-keyframes spinner
    0%
      -webkit-transform:rotate(0)
      -moz-transform:rotate(0)
      -ms-transform:rotate(0)
      -o-transform:rotate(0)
      transform:rotate(0)
    100%
      -webkit-transform:rotate(360deg)
      -moz-transform:rotate(360deg)
      -ms-transform:rotate(360deg)
      -o-transform:rotate(360deg)
      transform:rotate(360deg)

  @keyframes spinner
    0%
      -webkit-transform:rotate(0)
      -moz-transform:rotate(0)
      -ms-transform:rotate(0)
      -o-transform:rotate(0)
      transform:rotate(0)
    100%
      -webkit-transform:rotate(360deg)
      -moz-transform:rotate(360deg)
      -ms-transform:rotate(360deg)
      -o-transform:rotate(360deg)
      transform:rotate(360deg)
</style>
