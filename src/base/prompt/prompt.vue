<template>
  <transition name="fade">
    <div class="prompt-message" v-if="isShow">
      {{message}}
    </div>
  </transition>
</template>

<script type="text/javascript">
  export default {
    props: {
      message: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        isShow: false
      }
    },
    methods: {
      close () {
        this.isShow = false
      },
      show () {
        this.isShow = true
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s
  .fade-enter, .fade-leave-to
    opacity: 0
  .prompt-message
    position: fixed
    padding: 1rem
    color: #fff
    background-color: #5F6161
    border-radius: .4rem
    top:50%
    left: 50%
    transform: translate(-50%, -50%)
    z-index: 999999999
    font-size :1.2rem
</style>
