<template>
  <div class="log-in">
    <transition name="slider">
      <div class="login">
        <div class="login-input">
          <input type="tel" placeholder="请输入手机号" v-model="account" class="log-input" >
          <input type="password" placeholder="请输入密码" v-model="password" class="log-input">
          <a href="javascript:;" class="log-btn" @click="login">登录</a>
        </div>
      </div>
    </transition>
    <preloader v-if="isLoging"></preloader>
  </div>
</template>

<script>
  import Preloader from 'base/preloader/preloader'

  export default {
    data () {
      return {
        account: '',
        password: '',
        isLoging: false
      }
    },
    components: {
      Preloader
    },
    methods: {
      login () {
        if (this.account !== '' && this.password !== '') {
          this.toLogin()
        }
      },
      toLogin () {
        this.isLoging = true
        setTimeout(() => {
          // 登录状态1小时后过期
          this.$cookie.set('session', '123446', { expires: '1h' })
          this.isLoging = false
          this.$router.push('/recommend')
        }, 1000)
      }
    },
    mounted () {
      if (this.$cookie.get('session')) {
        this.$router.push('/recommend')
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

  .login
    position: fixed
    z-index: 999
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color :#fff
    .login-input
      margin :1.5rem
      .log-input
        width: 100%
        padding :0 1.5rem
        border: 1px solid #ebebeb
        height :4.8rem
        line-height :1.8rem
        border-radius :.5rem
        margin-bottom :1.5rem
        background-color :$color-background
      .log-btn
        display: block
        height: 5rem
        width: 100%
        background: $color-blue
        border-radius: 3px
        color: #fff
        text-align: center
        font-size :$font-size-medium-x
        line-height :5rem
</style>
