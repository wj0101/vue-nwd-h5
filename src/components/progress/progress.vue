<template>
  <transition name="slider">
    <div class="progess">
      <div class="switches-wrapper">
        <switches :currentIndex="currentIndex" :switches="switches" @switch="switchItem"></switches>
      </div>
      <div class="list-wrapper" ref="warps">
        <scroll ref="favoriteList" class="list-scroll" v-if="currentIndex===0" :data="favoriteList">
          <div class="list-inner">
            <lately-loan :latelyLoanData="favoriteList" @select="selectListLoan"></lately-loan>
          </div>
        </scroll>
        <scroll ref="playList" class="list-scroll" v-if="currentIndex===1" :data="loanHistory">
          <div class="list-inner">
            <loan-list :loanData="loanHistory" @select="selectListLoan"></loan-list>
          </div>
        </scroll>
      </div>
      <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="noResultText"></no-result>
      </div>
      <loan-details></loan-details>
      <preloader v-show="!loanHistory.length || !favoriteList.length"></preloader>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import Switches from 'base/switches/switches'
  import Scroll from 'base/scroll/scroll'
  import NoResult from 'base/no-result/no-result'
  import LoanList from 'base/loanlist/loanlist'
  import LoanDetails from 'components/loandetails/loandetails'
  import LatelyLoan from 'components/latelyloan/latelyloan'
  import {mapActions, mapMutations} from 'vuex'
  import Preloader from 'base/preloader/preloader'

  export default {
    data () {
      return {
        currentIndex: 0,
        switches: [
          {name: '近期借款'},
          {name: '历史借款'}
        ],
        favoriteList: [],
        loanHistory: []
      }
    },
    components: {
      Switches,
      Scroll,
      NoResult,
      LoanList,
      LoanDetails,
      LatelyLoan,
      Preloader
    },
    computed: {
      noResult () {
        if (this.currentIndex === 0) {
          return !this.favoriteList.length
        } else {
          return !this.loanHistory.length
        }
      },
      noResultText () {
        if (this.currentIndex === 0) {
          return '您暂时未提交相关借款申请'
        } else {
          return '您暂时没有历史借款申请'
        }
      }
    },
    created () {
      this.historyData()
      this.latelyData()
    },
    methods: {
      switchItem (index) {
        this.currentIndex = index
      },
      selectListLoan (item, index) {
        this.selectLoan({
          list: this.loanHistory,
          index
        })
      },
      historyData () {
        this.$ajax.get('static/loandata.json?t=' + (new Date()).getTime().toString()).then((response) => {
          this.loanHistory = response.data.list
        }).catch((error) => {
          console.log(error)
        })
      },
      latelyData () {
        this.$ajax.get('static/latelyloandata.json?t=' + (new Date()).getTime().toString()).then((response) => {
          this.favoriteList = response.data.list
        }).catch((error) => {
          console.log(error)
        })
      },
      ...mapActions([
        'selectLoan'
      ]),
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN'
      })
    },
    mounted () {
      this.setFullScreen(false)
    }
  }
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider-enter-active,.slider-leave-active
    transition :all 0.3s

  .slider-enter,.slider-leave-to
    transform :translate3D(100%,0,0)

  .progess
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color :$color-background
    .list-wrapper
      position: absolute
      top: 6.5rem
      bottom: 0
      width: 100%
      .list-scroll
        height: 100%
        overflow: hidden
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
