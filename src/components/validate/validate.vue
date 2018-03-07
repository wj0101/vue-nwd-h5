<template>
  <transition name="slider">
    <div class="validate">
      <div class="inner">
        <h3>实名认证一旦成功就不能修改</h3>
        <div class="box">
          <div class="inputText" >
            <div class="text">真实姓名</div>
            <input type="text" name="streetName"  placeholder="请输入真实姓名" class="address" maxlength="6" v-model="realNameText">
          </div>
        </div>
        <div class="box">
          <div class="inputText" >
            <div class="text">身份证号</div>
            <input type="text" name="streetName"  placeholder="请输入身份证号" class="address" maxlength="18" v-model="idInput">
          </div>
        </div>
        <p>请填写本人真实信息，核实后不可更改</p>
        <div class="button" ref="btnkeep">
          <button type="submit" class="btn" @click="saveId">保存</button>
        </div>
      </div>
      <prompt :message="messageText" ref="prompt"></prompt>
      <error-info :text="errorText" @confirm="goBack" ref="errorShow"></error-info>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import Prompt from 'base/prompt/prompt'
  import ErrorInfo from 'base/error-info/error-info'
  import {mapMutations} from 'vuex'
  export default {
    data () {
      return {
        realNameText: '',
        messageText: '',
        idInput: '',
        errorText: ''
      }
    },
    components: {
      Prompt,
      ErrorInfo
    },
    methods: {
      goBack () {
        this.$refs.errorShow.hide()
        this.$router.push('/recommend')
      },
      saveId () {
        let regName = /^[\u4e00-\u9fa5]{2,4}$/

        if (!this.realNameText) {
          this.messageText = '请输入姓名'
          this._submit()
        } else if (!regName.test(this.realNameText)) {
          this.messageText = '真实姓名填写有误'
          this._submit()
        } else if (!this.idInput) {
          this.messageText = '请输入身份证号'
          this._submit()
        } else {
          this.isIdCardNo(this.idInput)
        }
      },
      getAge () {
        this.idInput.substring(6, 10) + '-' + this.idInput.substring(10, 12) + '-' + this.idInput.substring(12, 14)

        let myDate = new Date()
        let month = myDate.getMonth() + 1
        let day = myDate.getDate()
        let age = myDate.getFullYear() - this.idInput.substring(6, 10) - 1
        if (this.idInput.substring(10, 12) < month || this.idInput.substring(10, 12) === month && this.idInput.substring(12, 14) <= day) {
          age++
        }
        if (age <= 18) {
          this.errorText = '很抱歉！您未满18岁暂不能申请借款'
          this.$refs.errorShow.show()
        } else if (age > 18) {
          this.messageText = '绑定成功'
          this._submit()
          this.setIdValidate(true)
          localStorage.setItem('cardId', 'ok')
          setTimeout(() => {
            this.$router.push('/recommend')
          }, 2000)
        }
      },
      isIdCardNo (idCard) {
        let regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
        if (regIdCard.test(idCard)) {
          if (idCard.length === 18) {
            let idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
            let idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]
            let idCardWiSum = 0
            for (let i = 0; i < 17; i++) {
              idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i]
            }
            let idCardMod = idCardWiSum % 11
            let idCardLast = idCard.substring(17)

            if (idCardMod === 2) {
              if (idCardLast === 'X' || idCardLast === 'x') {
                this.getAge()
                return true
              } else {
                this.messageText = '身份证号码错误！'
                this._submit()
                return false
              }
            } else {
              // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
              if (Number(idCardLast) === idCardY[idCardMod]) {
                this.getAge()
                return true
              } else {
                this.messageText = '身份证号码错误！'
                this._submit()
                return false
              }
            }
          }
        } else {
          this.messageText = '身份证格式不正确！'
          this._submit()
          return false
        }
      },
      _submit () {
        this.$refs.prompt.show()
        setTimeout(() => {
          this.$refs.prompt.close()
        }, 2000)
      },
      ...mapMutations({
        setIdValidate: 'SET_ID_VALIDATE'
      })
    }
  }
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider-enter-active,.slider-leave-active
    transition :all 0.3s

  .slider-enter,.slider-leave-to
    transform :translate3D(100%,0,0)

  .validate
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color :$color-background
    h3
      font-size :$font-size-medium
      text-align :center
      padding :1.5rem 0
    .box
      background #fff
      .inputText
        display :flex
        padding :1.5rem 3rem 1.5rem 0
        margin-left :1.5rem
        border-bottom :1px solid $color-border
        font-size :$font-size-medium
        flex-direction:row-reverse
        position :relative
        background :#fff
        .address
          text-align :right
          width :70%
          font-size :$font-size-medium
        .text
          position :absolute
          left :0
        .left15
          left :1.5rem
    p
      padding 1.5rem
      font-size :$font-size-small
      color :$color-text-x
    .button
      margin :1.5rem auto 0 auto
      width :80%
      text-align :center
      .btn
        border-radius: .3rem
        font-size: $font-size-medium-x
        color: #fff
        width :100%
        height :5rem
        line-height :5rem
        background: $color-blue
</style>
