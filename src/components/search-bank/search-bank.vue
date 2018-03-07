<template>
  <transition name="normal">
    <div class="search" v-show="searchFullScreen">
      <div class="search-box-wrapper">
        <search-box ref="searchBox"></search-box>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import SearchBox from 'base/search-box/search-box'

  export default {
    components: {
      SearchBox
    },
    computed: {
      ...mapGetters([
        'searchFullScreen'
      ])
    },
    methods: {
      goBack () {
        this.setSearchFullScreen(false)
      },
      ...mapMutations({
        setSearchFullScreen: 'SET_SEARCH_FULL_SCREEN'
      })
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 150
    background: $color-background
    .search-box-wrapper
      padding: 1rem 2rem
      background-color #fff
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
</style>
