<template>
  <transition name="slider">
    <div class="zhima">
      zhima
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'stateCommunic'
      ])
    },
    mounted () {
      if (!this.stateCommunic) {
        setTimeout(() => {
          this.$router.back()
        }, 500)
      } else {
        return
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

  .zhima
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color :$color-background
</style>
