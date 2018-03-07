<template>
  <div class="search-content">
    <div class="search-box">
      <i class="icon-search"></i>
      <input class="box" :placeholder="placeholder" v-model="query" ref="query">
      <i class="icon-dismiss" @click="clear" v-show="query"></i>
    </div>
    <div class="back-pages" @click="pageDown">
      <i class="icon-down-arrow"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {debounce} from 'common/js/util'
  import {mapMutations} from 'vuex'

  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索银行'
      }
    },
    data () {
      return {
        query: ''
      }
    },
    methods: {
      clear () {
        this.query = ''
      },
      setquery (query) {
        this.query = query
      },
      blur () {
        this.$refs.query.blur()
      },
      pageDown () {
        this.searchFullScreen(false)
      },
      ...mapMutations({
        searchFullScreen: 'SET_SEARCH_FULL_SCREEN'
      })
    },
    created () {
      this.$watch('query', debounce((newquery) => {
        this.$emit('query', newquery)
      }, 500))
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .search-content
    position :relative
    .search-box
      display: flex
      align-items: center
      box-sizing: border-box
      width: 90%
      padding: 0 .6rem
      height: 4rem
      background: $color-background
      border-radius: 2rem
      .icon-search
        width :1.8rem
        height :1.8rem
        border:2px solid #88868f
        border-radius :50%
        color: #fff
        position :relative
        &::before
          content:''
          width :.8rem
          height :2px
          background :#88868f
          position :absolute
          bottom :0
          left :1.2rem
          transform : rotate(37deg)
      .box
        flex: 1
        margin: 0 1.3rem
        line-height: 1.8rem
        background:$color-background
        color: $color-text
        font-size: $font-size-medium
        &::placeholder
          color: $color-text-d
      .icon-dismiss
        width :2rem
        height :2rem
        position :relative
        &::before
          content:''
          width :2rem
          height :.2rem
          background :#88868f
          position :absolute
          border-radius :2rem
          transform : rotate(45deg)
          top :50%
          margin-top :-.1rem
        &::after
          content:''
          width :2rem
          height :.2rem
          background :#88868f
          position :absolute
          border-radius :2rem
          transform : rotate(-45deg)
          top :50%
          margin-top :-.1rem
    .back-pages
      position :absolute
      right :-.5rem
      top :50%
      margin-top :-2rem
      padding :1rem
      .icon-down-arrow
        border-right: 0.2rem solid #999
        border-top: 0.2rem solid #999
        height: 1.6rem
        width: 1.6rem
        transform: rotate(135deg)
        -webkit-transform: rotate(135deg)
        border-left: 0.2rem solid transparent
        border-bottom: 0.2rem solid transparent
        display :inline-block
</style>
