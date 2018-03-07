<template>
  <div class="recommend" ref="recommend" >
    <scroll ref="scroll" class="recommend-content"
            :data="recommends"
            :pullDownRefresh="pullDownRefreshObj"
            :pullUpLoad="pullUpLoadObj"
            @pullingDown="proListNum"
    >
      <div>
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <slider-swiper>
            <div v-for="item in recommends" ref="sliderIn">
              <a :href="item.linkUrl">
                <img class="needsclick"  :src="item.picUrl" @load="imagesload" ref="imgHeight">
              </a>
            </div>
          </slider-swiper>
        </div>
        <tab></tab>
        <div class="product-list">
          <ul>
            <li class="listTitle" @click="selectcard(item)" v-for="item in listName">
              <div class="icon">
                <img :src="item.img" class="imgAuto">
              </div>
              <div class="text">
                <h2 class="name">{{item.productname}}<span class="right-text text-color-blue">{{item.slogan}}</span></h2>
                <div class="details">{{item.describe}}</div>
              </div>
              <div class="icon-right-arrow"></div>
            </li>
          </ul>
          <div class="bottomImg c_middle">
            <img src="./footerbg.png" alt="">
          </div>
        </div>
        <slot name="pulldown"></slot>
      </div>
      <div class="loadingBox" v-show="!recommends.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import Tab from 'components/tab/tab'
  import SliderSwiper from 'base/slider-swiper/slider-swiper'

  export default {
    components: {
      Scroll,
      Loading,
      Tab,
      SliderSwiper
    },
    data () {
      return {
        pullDownRefresh: true,
        pullDownRefreshThreshold: 90,
        pullDownRefreshStop: 40,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        listName: [
          {
            productname: '小额快速借款',
            slogan: '实时到账',
            describe: '有芝麻分就能借，额度最高3000元',
            img: require('./index_02.png'),
            router: 'miaola'
          },
          {
            productname: '简单大额借款',
            slogan: '一步借到',
            describe: '信用卡消费人士专享，额度最高30000元',
            img: require('./main_03.png'),
            router: 'card'
          }
        ],
        apiUrl: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
        recommends: []
      }
    },
    methods: {
      imagesload () {
        this._setSliderWidthTO()
      },
      _setSliderWidthTO () {
        this.children = this.$refs.sliderIn
        this.imgH = this.$refs.imgHeight
        let slideHeight = this.screenWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.imgH[i]
          child.style.height = slideHeight / 2.5 + 'px'
        }
      },
      selectcard (item) {
        this.$router.push({
          path: `/recommend/${item.router}`
        })
      },
      proListNum () {
        this.recommends = this.recommends.slice()
      },
      getBanner () {
        this.$http.jsonp(this.apiUrl, {
          params: {
            g_tk: 5381,
            format: 'jsonp'
          },
          jsonp: 'jsonpCallback'
        })
          .then((response) => {
            this.recommends = response.data.data.slider
            setTimeout(() => {
              if (this.recommends.length > 0) {
                this.$refs.scroll.refresh()
              }
            }, 500)
          })
      }
    },
    mounted () {
      setTimeout(() => {
        this.proListNum()
      }, 20)
      window.screenWidth = document.body.clientWidth
      this.screenWidth = window.screenWidth
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
          this._setSliderWidthTO()
        })()
      }
    },
    watch: {
      pullDownRefreshObj: {
        handler () {
          this.rebuildScroll()
        },
        deep: true
      },
      pullUpLoadObj: {
        handler () {
          this.rebuildScroll()
        },
        deep: true
      }
    },
    computed: {
      pullDownRefreshObj: function () {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
          stop: parseInt(this.pullDownRefreshStop)
        } : false
      },
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      }
    },
    created () {
      this.getBanner()
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .recommend
    position: fixed
    width: 100%
    top: 0
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      position :relative
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
  .listTitle
    display :flex
    flex-direction: row
    align-items: center
    margin: 2rem 0 0 0
    background-color :#fff
    height :12rem
    .icon
      padding :1.2rem
      flex: 0 0 60px
    .text
      display: flex
      flex-direction: column
      justify-content: center
      flex: 1
      line-height: 20px
      overflow: hidden
      font-size: $font-size-medium
      .name
        margin-bottom: .5rem
        color: $color-text
        font-size :$font-size-medium-x
      .details
        color: $color-dialog-background
        font-size :$font-size-small
    .icon-right-arrow
      border-right: .2rem solid $color-dialog-background;
      border-top: .2rem solid $color-dialog-background;
      height: 1.2rem;
      width: 1.2rem;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      border-left: .2rem solid transparent;
      border-bottom: .2rem solid transparent;
      display: inline-block;
      margin-right :1.5rem
    .right-text
      font-size :$font-size-small-s
      border-radius :2rem
      padding :0 .5rem
      display :inline-block
      height :2rem
      margin-left :1rem
      vertical-align: bottom
    .text-color-blue
      border:1px solid $color-theme
      color :$color-theme
    .text-color-orange
      border:1px solid $color-sub-theme
      color :$color-sub-theme
  .bottomImg
    width :70%
    margin :10% auto
    padding-bottom :5rem
    .imgAuto
      display :block
      margin :0 auto


</style>
