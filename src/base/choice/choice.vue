<template>
  <transition name="normal">
    <div class="checkbox-wrap" v-show="showFlag" ref="wrap">
      <div class="inner">
        <div class="mycheck" v-for="(item,index) in text" @tap.stop="hideCheck">
          <input type="radio" :value="item.id" :id="`checkbox_${index}`" :name="item.radioName" v-model="checkedVal" />
          <label :for="`checkbox_${index}`" :id="`check_${index}`">
            {{item.name}}
          </label>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      text: {
        type: Array,
        default: []
      },
      checkedValue: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        checkedVal: '',
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      },
      hideCheck () {
        this.$emit('cancel')
      }
    },
    created () {
      this.$watch('checkedValue', (newquery) => {
        this.checkedVal = newquery
      })
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"

  .checkbox-wrap
    overflow :hidden
    background-color :$color-background
    transition: height .3s
    .inner
      overflow :hidden
      padding-bottom :1.5rem
      .mycheck
        position :relative
        float: left
        margin :1.5rem 0 0 1rem
        input[type=radio]
          position: absolute
          left: 0
          top: 0
          opacity: 0
          height :100%
          width :100%
        label
          display :inline-block
          background: #fff
          border:1px solid #ccc
          -moz-border-radius: 3px
          -webkit-border-radius: 3px
          border-radius:3px
          text-align:center
          padding: 1rem
          font-size :$font-size-medium
        input[type=radio]:checked + label
          color: $color-blue
          border:1px solid $color-blue
</style>
