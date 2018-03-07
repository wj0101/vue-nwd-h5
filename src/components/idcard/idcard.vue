<template>
  <transition name='slider'>
    <div class='idcard'>
      <div class="wrapper" ref="wrapper">
        <div class='card-wrapper'>
          <div class='title'>
            <div class='text-left'>照片上传<span class="text-warn">(照片一旦提交保存不能修改)</span></div>
            <div class='text-right' @click="showPhoto">拍摄要求</div>
          </div>
          <ul class='container'>
            <li class='data-view' id='dataview'>
              <input type='file' accept='image/*' @change='imageView' ref='photofirst'>
              <canvas id='canvas'></canvas>
              <img src="./Positive.png" v-if="imgShow"/>
            </li>
            <li class='data-view' id='dataviewother'>
              <input type='file' accept='image/*' @change='imageViewOther' ref='photoSecond'>
              <canvas id='canvasother'></canvas>
              <img src="./oppsite.png" v-if="imgShowother"/>
            </li>
            <li class='data-view' id='dataviewown'>
              <input type='file' accept='image/*' @change='imageViewOwn' ref='photosThird'>
              <canvas id='canvasown'></canvas>
              <img src="./PositiveSelf.png" v-if="imgShowOwn"/>
            </li>
          </ul>
          <div class="button">
            <a class="btn" @click="buttonSet" href="javascript:;">提交</a>
          </div>
        </div>
      </div>
      <popup-photo ref="photo"></popup-photo>
      <prompt :message="messagePhoto" ref="prompt"></prompt>
      <preloader v-show="loadingTime"></preloader>
    </div>
  </transition>
</template>
<script type='text/ecmascript-6'>
  import {prefixStyle} from 'common/js/dom'
  import BScroll from 'better-scroll'
  import PopupPhoto from 'base/popup-photo/popup-photo'
  import Prompt from 'base/prompt/prompt'
  import Preloader from 'base/preloader/preloader'
  import {mapMutations, mapGetters} from 'vuex'

  const transform = prefixStyle('transform')

  export default {
    data () {
      return {
        imgShow: true,
        imgShowother: true,
        imgShowOwn: true,
        imagePositive: false,
        imageOpposite: false,
        imageSelfie: false,
        messagePhoto: '',
        loadingTime: false,
        titleText: '图片上传中'
      }
    },
    mounted () {
      setTimeout(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
        })
      }, 100)
      if (!this.statePersonalData) {
        setTimeout(() => {
          this.$router.back()
        }, 500)
      } else {
        return
      }
    },
    methods: {
      showPhoto () {
        this.$refs.photo.show()
      },
      imageView () {
        this.imgShow = false
        let _file = this.$refs.photofirst.files[0]
        let fileType = _file.type
        if (/image\/\w+/.test(fileType)) {
          this.loadingTime = true
          let fileReader = new FileReader()
          fileReader.readAsDataURL(_file)
          fileReader.onload = (event) => {
            let image = new Image()
            image.src = event.target.result
            image.onload = () => {
              this.loadingTime = false
              let cvs = document.getElementById('canvas')
              let idc = document.getElementById('dataview')
              let t = idc.clientWidth
              let o = idc.clientHeight
              let a = image.width
              let n = image.height
              let s = a / t
              let c = n / o
              let l = 1 * (s > 1 || c > 1 ? 1 / (s >= c ? s : c) : 1)
              cvs.style[transform] = `translate(-50%, -50%) scale(${l})`
              cvs.style.width = `${a}px`
              cvs.style.height = `${n}px`
              let ctx = cvs.getContext('2d')
              ctx.clearRect(0, 0, cvs.width, cvs.height)
              if (!this.imagePositive) {
                ctx.drawImage(image, 0, 0, cvs.width, cvs.height)
                this.imagePositive = true
              }
              // let newImageData = cvs.toDataURL(fileType, 0.8)
              // let sendData = newImageData.replace('data:' + fileType + '; base64,', '')
            }
          }
        } else {
          console.log('请选择图片格式文件')
        }
      },
      imageViewOther () {
        this.imgShowother = false
        let _file = this.$refs.photoSecond.files[0]
        let fileType = _file.type
        if (/image\/\w+/.test(fileType)) {
          this.loadingTime = true
          let fileReader = new FileReader()
          fileReader.readAsDataURL(_file)
          fileReader.onload = (event) => {
            let image = new Image()
            image.src = event.target.result
            image.onload = () => {
              this.loadingTime = false
              let cvs = document.getElementById('canvasother')
              let idc = document.getElementById('dataviewother')
              let t = idc.clientWidth
              let o = idc.clientHeight
              let a = image.width
              let n = image.height
              let s = a / t
              let c = n / o
              let l = 1 * (s > 1 || c > 1 ? 1 / (s >= c ? s : c) : 1)
              cvs.style[transform] = `translate(-50%, -50%) scale(${l})`
              cvs.style.width = `${a}px`
              cvs.style.height = `${n}px`
              let ctx = cvs.getContext('2d')
              ctx.clearRect(0, 0, cvs.width, cvs.height)
              if (!this.imageOpposite) {
                ctx.drawImage(image, 0, 0, cvs.width, cvs.height)
                this.imageOpposite = true
              }
              // let newImageData = cvs.toDataURL(fileType, 0.8)
              // let sendData = newImageData.replace('data:' + fileType + '; base64,', '')
            }
          }
        } else {
          console.log('请选择图片格式文件')
        }
      },
      imageViewOwn () {
        this.imgShowOwn = false
        let _file = this.$refs.photosThird.files[0]
        let fileType = _file.type
        if (/image\/\w+/.test(fileType)) {
          this.loadingTime = true
          let fileReader = new FileReader()
          fileReader.readAsDataURL(_file)
          fileReader.onload = (event) => {
            let image = new Image()
            image.src = event.target.result
            image.onload = () => {
              this.loadingTime = false
              let cvs = document.getElementById('canvasown')
              let idc = document.getElementById('dataviewown')
              let t = idc.clientWidth
              let o = idc.clientHeight
              let a = image.width
              let n = image.height
              let s = a / t
              let c = n / o
              let l = 1 * (s > 1 || c > 1 ? 1 / (s >= c ? s : c) : 1)
              cvs.style[transform] = `translate(-50%, -50%) scale(${l})`
              cvs.style.width = `${a}px`
              cvs.style.height = `${n}px`
              let ctx = cvs.getContext('2d')
              ctx.clearRect(0, 0, cvs.width, cvs.height)
              if (!this.imageSelfie) {
                ctx.drawImage(image, 0, 0, cvs.width, cvs.height)
                this.imageSelfie = true
              }
              // let newImageData = cvs.toDataURL(fileType, 0.8)
              // let sendData = newImageData.replace('data:' + fileType + '; base64,', '')
            }
          }
        } else {
          console.log('请选择图片格式文件')
        }
      },
      buttonSet () {
        if (!this.imagePositive) {
          this.messagePhoto = '请上传身份证正面'
          this._buttonSet()
        } else if (!this.imageOpposite) {
          this.messagePhoto = '请上传身份证反面'
          this._buttonSet()
        } else if (!this.imageSelfie) {
          this.messagePhoto = '请上传自拍照'
          this._buttonSet()
        } else {
          this.statePhoto(true)
          this.messagePhoto = '上传成功'
          this._buttonSet()
          setTimeout(() => {
            this.$router.back()
          }, 2000)
        }
      },
      _buttonSet () {
        this.$refs.prompt.show()
        setTimeout(() => {
          this.$refs.prompt.close()
        }, 2000)
      },
      ...mapMutations({
        statePhoto: 'SET_STATE_PHOTO'
      })
    },
    computed: {
      ...mapGetters([
        'statePersonalData'
      ])
    },
    components: {
      PopupPhoto,
      Prompt,
      Preloader
    }
  }
</script>
<style lang='stylus' scoped rel='stylesheet/stylus'>
  @import '~common/stylus/variable'

  .slider-enter-active,.slider-leave-active
    transition :all 0.3s

  .slider-enter,.slider-leave-to
    transform :translate3D(100%,0,0)

  .idcard
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color :$color-background
    .card-wrapper
      margin-top :1.5rem
      padding-bottom :1.5rem
      .title
        display: flex
        flex-direction: row
        justify-content: space-between
        padding :1.5rem
        font-size :$font-size-medium
        background-color:#fff
        .text-left
          .text-warn
            font-size :$font-size-small
            color :red
        .text-right
          color :$color-blue
      .container
        background-color :#fff
        padding :1rem 0
        .data-view
          border: .2rem solid $color-blue
          overflow: hidden
          padding-right: 0
          margin :0 4rem 2rem 4rem
          border-radius :.3rem
          height :16rem
          position :relative
          input
            width: 100%
            height: 100%
            opacity: 0
            z-index: 100
            position: absolute
            top: 0
            left: 0
            background-color: red
          canvas
            position :absolute
            left: 50%
            top :50%
            transform: translate(-50%, -50%)
          img
            width: auto
            height: auto
            max-width: 100%
            max-height: 100%
            position :absolute
            left: 50%
            top :50%
            transform: translate(-50%, -50%)
            -webkit-transform: translate(-50%, -50%)
            -moz-transform: translate(-50%, -50%)
            -o-transform: translate(-50%, -50%)
  .button
    margin :1.5rem auto 0 auto
    width :80%
    text-align :center
    padding-bottom :5rem
    .btn
      border-radius: .3rem
      font-size: $font-size-medium-x
      color: #fff
      width :100%
      height :5rem
      line-height :5rem
      background: $color-blue
      display :block
  .wrapper
    height: 100%
    overflow: hidden
    position :relative
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
