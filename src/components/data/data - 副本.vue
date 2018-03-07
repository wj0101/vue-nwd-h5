<template>
  <transition name="slider">
    <div class="data">
      <div class="data-wrapper" ref="dataWrapper">
        <div class="inner">
          <div>
            <div class="title">基本资料<span>(真实的信息有助于您获得更高的额度)</span></div>
            <form @submit.prevent="submitVer">
              <div class="input-box">
                <div class="choice" @click.stop="showToggle" >
                  <div class="text">学历信息</div>
                  <div class="choice-info">
                    <span>{{education}}</span>
                    <div class="icon-right-arrow"></div>
                  </div>
                </div>
                <choice :text="checkdata" ref="choice" @getchoice="onChoice" @cancel="showToggleCancel" :checkedValue="defaultEducation"></choice>
                <div class="choice" @click.stop="showCity">
                  <div class="text">居住地址</div>
                  <div class="choice-info">
                    <span>{{aggregateShow()}}</span>
                    <div class="icon-right-arrow"></div>
                  </div>
                </div>
                <div class="inputText" >
                  <input type="text" name="streetName"  placeholder="请填写街道地址" class="address" maxlength="100" v-model="addressval">
                </div>
                <div class="mbt15">
                  <div class="box">
                    <div class="choice" @click.stop="showToggle2">
                      <div class="text">收入说明</div>
                      <div class="choice-info">
                        <span>{{income}}</span>
                        <div class="icon-right-arrow"></div>
                      </div>
                    </div>
                  </div>
                  <choice :text="incomedata" ref="choice2" @getchoice="onIncome" @cancel="showToggleCancel" :checkedValue="defaultIncome"></choice>
                </div>
                <div class="mbt15">
                  <div class="box">
                    <div class="inputText ml15">
                      <div class="text">单位名称</div>
                      <input type="text" name="companyName" value="" placeholder="请填写单位名称" class="address" maxlength="100" v-model="unitName">
                    </div>
                  </div>
                </div>
                <div class="titleContacts">
                  联系人信息（近6个月需联系）
                </div>
                <div class="choice" @click.stop="showToggle3">
                  <div class="text">关系1</div>
                  <div class="choice-info">
                    <span>{{relation}}</span>
                    <div class="icon-right-arrow"></div>
                  </div>
                </div>
                <choice :text="relationdata" ref="choice3" @getchoice="onRelation" @cancel="showToggleCancel" :checkedValue="defaultRelation"></choice>
                <div class="pt0">
                  <div class="box">
                    <div class="inputText ml15">
                      <div class="text">真实姓名</div>
                      <input type="text" name="realName" value="" placeholder="请输入真实姓名" class="address" maxlength="6" v-model="realName">
                    </div>
                  </div>
                </div>
                <div class="inputText">
                  <div class="text left15">手机号</div>
                  <input type="tel" name="phone" value="" placeholder="请填写真实的手机号码" class="address" maxlength="11" v-model="phoneNumber" >
                </div>
                <div class="bgtop"></div>
                <div class="choice" @click.stop="showToggle4">
                  <div class="text">关系2</div>
                  <div class="choice-info">
                    <span>{{relationship}}</span>
                    <div class="icon-right-arrow"></div>
                  </div>
                </div>
                <choice :text="relationshipdata" ref="choice4" @getchoice="onRelationship" @cancel="showToggleCancel" :checkedValue="defaultRelationship"></choice>
                <div class="pt0">
                  <div class="box">
                    <div class="inputText ml15">
                      <div class="text">真实姓名</div>
                      <input type="text" name="realName" value="" placeholder="请输入真实姓名" class="address" maxlength="6" v-model="fullName">
                    </div>
                  </div>
                </div>
                <div class="inputText">
                  <div class="text left15">手机号</div>
                  <input type="tel" name="phone" value="" placeholder="请填写真实的手机号码" class="address" maxlength="11" v-model="phoneNum">
                </div>
              </div>
              <div class="button" ref="btnPB">
                <button type="submit" class="btn">保存</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <city ref="city" @getDistrict="valDistrict" @getCity="valCity" @getProvince="valProvince"></city>
      <prompt :message="messageText" ref="prompt"></prompt>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import Choice from 'base/choice/choice'
  import City from 'base/city/city'
  import BScroll from 'better-scroll'
  import Prompt from 'base/prompt/prompt'
  import {mapMutations} from 'vuex'
  import {choiceShowMixin} from 'common/js/mixin'

  export default {
    mixins: [choiceShowMixin],
    components: {
      Choice,
      City,
      Prompt
    },
    mounted () {
      setTimeout(() => {
        this.scroll = new BScroll(this.$refs.dataWrapper, {
          click: true,
          tap: true
        })
      }, 100)
    },
    data () {
      return {
        checkdata: [
          {
            name: '研究生或以上',
            id: 4,
            radioName: 'checkdata'
          },
          {
            name: '大学本科(含双学历)',
            id: 3,
            radioName: 'checkdata'
          },
          {
            name: '大学专科',
            id: 2,
            radioName: 'checkdata'
          },
          {
            name: '高中或中专',
            id: 1,
            radioName: 'checkdata'
          },
          {
            name: '初中及以下',
            id: 0,
            radioName: 'checkdata'
          }
        ],
        incomedata: [
          {
            name: '有固定收入',
            id: 1,
            radioName: 'incomedata'
          },
          {
            name: '无固定收入',
            id: 2,
            radioName: 'incomedata'
          }
        ],
        relationdata: [
          {
            name: '父亲',
            id: 1,
            radioName: 'relationdata'
          },
          {
            name: '母亲',
            id: 2,
            radioName: 'relationdata'
          },
          {
            name: '配偶',
            id: 3,
            radioName: 'relationdata'
          },
          {
            name: '儿子',
            id: 4,
            radioName: 'relationdata'
          },
          {
            name: '女儿',
            id: 5,
            radioName: 'relationdata'
          },
          {
            name: '哥哥',
            id: 6,
            radioName: 'relationdata'
          },
          {
            name: '弟弟',
            id: 7,
            radioName: 'relationdata'
          },
          {
            name: '姐姐',
            id: 8,
            radioName: 'relationdata'
          },
          {
            name: '妹妹',
            id: 9,
            radioName: 'relationdata'
          }
        ],
        relationshipdata: [
          {
            name: '同事',
            id: 10,
            radioName: 'relationdata'
          },
          {
            name: '朋友',
            id: 11,
            radioName: 'relationdata'
          },
          {
            name: '同学',
            id: 12,
            radioName: 'relationdata'
          },
          {
            name: '其它',
            id: 13,
            radioName: 'relationdata'
          }
        ],
        isShow: true,
        education: '请选择',
        income: '请选择',
        relation: '请选择',
        relationship: '请选择',
        area: '请选择',
        city: '',
        province: '',
        messageText: '',
        addressval: '',
        unitName: '',
        realName: '',
        phoneNumber: '',
        fullName: '',
        phoneNum: '',
        defaultEducation: '0',
        defaultIncome: '1',
        defaultRelation: '2',
        defaultRelationship: '11'
      }
    },
    methods: {
      handlePlaylist (flag) {
        const bottom = flag === false ? '10rem' : '8rem'
        this.$refs.btnPB.style.paddingBottom = bottom
        this.scroll.refresh()
      },
      addevent () {
        document.addEventListener('tap', this._currentData, true)
        document.addEventListener('tap', this._currentData2, true)
        document.addEventListener('tap', this._currentData3, true)
        document.addEventListener('tap', this._currentData4, true)
      },
      _currentData (event) {
        var focusTargetDom = event.target
        if (focusTargetDom.tagName.toLowerCase() === 'input' && focusTargetDom.getAttribute('name') === 'checkdata') {
          this.defaultEducation = focusTargetDom.value
          this.getCheckedEducation(focusTargetDom.value)
        }
      },
      _currentData2 (event) {
        var focusTargetDom = event.target
        if (focusTargetDom.tagName.toLowerCase() === 'input' && focusTargetDom.getAttribute('name') === 'incomedata') {
          this.defaultIncome = focusTargetDom.value
          this.getCheckedIncome(focusTargetDom.value)
        }
      },
      _currentData3 (event) {
        var focusTargetDom = event.target
        if (focusTargetDom.tagName.toLowerCase() === 'input' && focusTargetDom.getAttribute('name') === 'relationdata') {
          this.defaultRelation = focusTargetDom.value
          this.getCheckedRelation(focusTargetDom.value)
        }
      },
      _currentData4 (event) {
        var focusTargetDom = event.target
        if (focusTargetDom.tagName.toLowerCase() === 'input' && focusTargetDom.getAttribute('name') === 'relationdata') {
          this.defaultRelationship = focusTargetDom.value
          this.getCheckedRelationship(focusTargetDom.value)
        }
      },
      getCheckedRelationship (val) {
        if (val === '10') {
          this.relationship = '同事'
        } else if (val === '11') {
          this.relationship = '朋友'
        } else if (val === '12') {
          this.relationship = '同学'
        } else if (val === '13') {
          this.relationship = '同学'
        }
      },
      getCheckedIncome (val) {
        if (val === '1') {
          this.income = '有固定收入'
        } else if (val === '2') {
          this.income = '无固定收入'
        }
      },
      getCheckedRelation (val) {
        if (val === '1') {
          this.relation = '父亲'
        } else if (val === '2') {
          this.relation = '母亲'
        } else if (val === '3') {
          this.relation = '配偶'
        } else if (val === '4') {
          this.relation = '儿子'
        } else if (val === '5') {
          this.relation = '女儿'
        } else if (val === '6') {
          this.relation = '哥哥'
        } else if (val === '7') {
          this.relation = '弟弟'
        } else if (val === '8') {
          this.relation = '姐姐'
        } else if (val === '9') {
          this.relation = '妹妹'
        }
      },
      getCheckedEducation (val) {
        if (val === '0') {
          this.education = '初中及以下'
        } else if (val === '1') {
          this.education = '高中或中专'
        } else if (val === '2') {
          this.education = '大学专科'
        } else if (val === '3') {
          this.education = '大学本科(含双学历)'
        } else if (val === '4') {
          this.education = '研究生或以上'
        }
      },
      valDistrict (val) {
        this.area = val
      },
      valCity (val) {
        this.city = val
      },
      valProvince (val) {
        this.province = val
      },
      aggregateShow () {
        return `${this.province} ${this.city} ${this.area}`
      },
      showToggle () {
        setTimeout(() => {
          this.scroll = new BScroll(this.$refs.dataWrapper, {
          })
        }, 100)
        this.isShow = !this.isShow
        if (this.isShow) {
          this.$refs.choice.hide()
        } else {
          this.$refs.choice.show()
        }
      },
      showToggleCancel () {
        this.isShow = true
        setTimeout(() => {
          this.scroll = new BScroll(this.$refs.dataWrapper, {
          })
        }, 100)
      },
      showToggle2 () {
        setTimeout(() => {
          this.scroll = new BScroll(this.$refs.dataWrapper, {
          })
        }, 100)
        this.isShow = !this.isShow
        if (this.isShow) {
          this.$refs.choice2.hide()
        } else {
          this.$refs.choice2.show()
        }
      },
      showToggle3 () {
        setTimeout(() => {
          this.scroll = new BScroll(this.$refs.dataWrapper, {
          })
        }, 100)
        this.isShow = !this.isShow
        if (this.isShow) {
          this.$refs.choice3.hide()
        } else {
          this.$refs.choice3.show()
        }
      },
      showToggle4 () {
        this.setChoiceShow(this.isShow)
        this.isShow = !this.isShow
        if (this.isShow) {
          this.$refs.choice4.hide()
        } else {
          this.$refs.choice4.show()
        }
      },
      onChoice (value) {
        if (value === 0) {
          this.education = '初中及以下'
        } else if (value === 1) {
          this.education = '高中或中专'
        } else if (value === 2) {
          this.education = '大学专科'
        } else if (value === 3) {
          this.education = '大学本科(含双学历)'
        } else if (value === 4) {
          this.education = '研究生或以上'
        }
      },
      onIncome (value) {
        if (value === 1) {
          this.income = '有固定收入'
        } else if (value === 2) {
          this.income = '无固定收入'
        }
      },
      onRelation (value) {
        if (value === 1) {
          this.relation = '父亲'
        } else if (value === 2) {
          this.relation = '母亲'
        } else if (value === 3) {
          this.relation = '配偶'
        } else if (value === 4) {
          this.relation = '儿子'
        } else if (value === 5) {
          this.relation = '女儿'
        } else if (value === 6) {
          this.relation = '哥哥'
        } else if (value === 7) {
          this.relation = '弟弟'
        } else if (value === 8) {
          this.relation = '姐姐'
        } else if (value === 9) {
          this.relation = '妹妹'
        }
      },
      onRelationship (value) {
        if (value === 10) {
          this.relationship = '同事'
        } else if (value === 11) {
          this.relationship = '朋友'
        } else if (value === 12) {
          this.relationship = '同学'
        } else if (value === 13) {
          this.relationship = '其它'
        }
      },
      showCity () {
        this.$refs.city.showAdd()
      },
      submitVer () {
        let regName = /^[\u4e00-\u9fa5]{2,4}$/
        let mobileRegex = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/

        if (this.education === '请选择') {
          this.messageText = '请选择学历'
          this._submit()
        } else if (this.area === '请选择') {
          this.messageText = '请选择居住地址'
          this._submit()
        } else if (!this.addressval) {
          this.messageText = '请输入街道地址'
          this._submit()
        } else if (this.income === '请选择') {
          this.messageText = '请选择收入说明'
          this._submit()
        } else if (!this.unitName) {
          this.messageText = '请输入单位名称'
          this._submit()
        } else if (this.relation === '请选择') {
          this.messageText = '请选择关系'
          this._submit()
        } else if (!this.realName) {
          this.messageText = '请输入姓名'
          this._submit()
        } else if (!this.phoneNumber) {
          this.messageText = '请输入手机号'
          this._submit()
        } else if (this.relationship === '请选择') {
          this.messageText = '请选择关系'
          this._submit()
        } else if (!this.fullName) {
          this.messageText = '请输入姓名'
          this._submit()
        } else if (!this.phoneNum) {
          this.messageText = '请输入手机号'
          this._submit()
        } else if (!regName.test(this.realName)) {
          this.messageText = '真实姓名填写有误'
          this._submit()
        } else if (!regName.test(this.fullName)) {
          this.messageText = '真实姓名填写有误'
          this._submit()
        } else if (!mobileRegex.test(this.phoneNumber)) {
          this.messageText = '手机号输入不正确'
          this._submit()
        } else if (!mobileRegex.test(this.phoneNum)) {
          this.messageText = '手机号输入不正确'
          this._submit()
        } else {
          this.statePersonalData(true)
          console.log('成功')
        }
      },
      _submit () {
        this.$refs.prompt.show()
        setTimeout(() => {
          this.$refs.prompt.close()
        }, 3000)
      },
      ...mapMutations({
        statePersonalData: 'SET_STATE_PERSONAL_DATA',
        setChoiceShow: 'SET_CHOICE_SHOW'
      })
    },
    created () {
      this.addevent()
    }
  }
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider-enter-active,.slider-leave-active
    transition :all 0.3s
  .slider-enter,.slider-leave-to
    transform :translate3D(100%,0,0)

  .data
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color :$color-background
    .title
      height :3rem
      line-height :3rem
      padding :0 1rem
      font-size :$font-size-small
      span
        color :#ff0000
    form
      .input-box
        background-color :#fff
        .titleContacts
          background-color :$color-background
          padding-left :1.5rem
          font-size :$font-size-small
          color :$color-text-x
          height :3rem
          line-height :3rem
        .choice
          display :flex
          flex-direction: row
          justify-content :space-between
          padding :1.5rem .5rem 1.5rem 0
          background-color :#fff
          font-size :$font-size-medium
          border-bottom :1px solid $color-border
          margin-left :1.5rem
          .choice-info
            .icon-right-arrow
              border-right: 0.2rem solid #999
              border-top: 0.2rem solid #999
              height: 1.2rem
              width: 1.2rem
              transform: rotate(45deg)
              -webkit-transform: rotate(45deg)
              border-left: 0.2rem solid transparent
              border-bottom: 0.2rem solid transparent
              display: inline-block
              margin-right: 1.5rem
        .inputText
          display :flex
          padding :1.5rem 3rem 1.5rem 0
          border-bottom :1px solid $color-border
          font-size :$font-size-medium
          flex-direction:row-reverse
          position :relative
          .address
            text-align :right
            width :70%
            font-size :$font-size-medium
          .text
            position :absolute
            left :0
          .left15
            left :1.5rem
  .mbt15
    background-color :$color-background
    padding :1.5rem 0 0 0
    .box
      background-color :#fff
      .ml15
        margin-left :1.5rem
  .pt0
    background-color :$color-background
    .box
      background-color :#fff
      .ml15
        margin-left :1.5rem
  .bgtop
    height :1rem
    background-color :$color-background
  .data-wrapper
    height: 100%
    overflow: hidden
    position :relative
  .button
    margin :1.5rem auto 0 auto
    width :80%
    text-align :center
    padding-bottom :8rem
    .btn
      border-radius: .3rem
      font-size: $font-size-medium-x
      color: #fff
      width :100%
      height :5rem
      line-height :5rem
      background: $color-blue
</style>
