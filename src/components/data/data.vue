<template>
  <transition name="slider">
    <div class="data">
      <scroll class="data-wrapper" ref="dataWrapper">
        <div class="inner">
          <div class="title">基本资料<span>(真实的信息有助于您获得更高的额度)</span></div>
          <form @submit.prevent="submitVer" id="inputBox">
            <div class="input-box">
              <div class="choice" @click.stop="showToggle(0,$event)" >
                <div class="text">学历信息</div>
                <div class="choice-info">
                  <span>{{education}}</span>
                  <div class="icon-right-arrow"></div>
                </div>
              </div>
              <choice :text="checkdata" ref="choice1" @cancel="showToggleCancel(0)" :checkedValue="defaultEducation"></choice>
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
              <div class="title-info">单位信息</div>
              <div class="bgc">
                <div class="box">
                  <div class="choice ml15">
                    <div class="text">所属行业</div>
                    <div class="choice-info">
                      <select id="selectVal">
                        <option value="0" selected="selected">请选择</option>
                        <option value="1">农业/林业/畜牧业/渔业</option>
                        <option value="2">采矿业</option>
                        <option value="3">制造业</option>
                        <option value="4">电力/热力/燃气/水生产/供应业</option>
                        <option value="5">建筑业</option>
                        <option value="6">批发/零售业</option>
                        <option value="7">交通运输/仓储业/邮政业</option>
                        <option value="8">住宿/餐饮业</option>
                        <option value="9">信息传输/软件/信息技术服务业</option>
                        <option value="10">金融业</option>
                        <option value="11">房地产业</option>
                        <option value="12">租赁/商务服务业</option>
                        <option value="13">科学研究/技术服务业</option>
                        <option value="14">水利/环境/公共设施管理业</option>
                        <option value="15">居民服务/修理/其他服务业</option>
                        <option value="16">教育</option>
                        <option value="17">卫生/社会工作</option>
                        <option value="18">文化/体育/娱乐业</option>
                        <option value="19">公共管理/社会保障/社会组织</option>
                        <option value="20">国际组织</option>
                      </select>
                      <div class="icon-right-arrow"></div>
                    </div>
                  </div>
                </div>
                <div class="box">
                  <div class="choice" @click.stop="showToggle(4,$event)" >
                    <div class="text">工作性质</div>
                    <div class="choice-info">
                      <span>{{natureWork}}</span>
                      <div class="icon-right-arrow"></div>
                    </div>
                  </div>
                  <choice :text="naturedata" ref="choice5" @cancel="showToggleCancel(4)" :checkedValue="defaultNature"></choice>
                </div>
                <div class="box">
                  <div class="inputText ml15">
                    <div class="text">单位名称</div>
                    <input type="text" name="companyName" value="" placeholder="请填写单位名称" class="address" maxlength="100" v-model="unitName">
                  </div>
                </div>
              </div>
              <div class="title-info">资产情况</div>
              <div class="bgc">
                <div class="box" @click.stop="showToggle(1,$event)">
                  <div class="choice">
                    <div class="text">收入说明</div>
                    <div class="choice-info">
                      <span>{{income}}</span>
                      <div class="icon-right-arrow"></div>
                    </div>
                  </div>
                </div>
                <choice :text="incomedata" ref="choice2" @cancel="showToggleCancel(1)" :checkedValue="defaultIncome"></choice>
              </div>
              <div class="bgc">
                <div class="box" @click.stop="showToggle(5,$event)">
                  <div class="choice">
                    <div class="text">负债情况</div>
                    <div class="choice-info">
                      <span>{{liabilities}}</span>
                      <div class="icon-right-arrow"></div>
                    </div>
                  </div>
                </div>
                <choice :text="liabilitiesdata" ref="choice6" @cancel="showToggleCancel(5)" :checkedValue="defaultLiabilities"></choice>
              </div>
              <div class="titleContacts">
                联系人信息（近6个月需联系）
              </div>
              <div class="choice" @click.stop="showToggle(2, $event)">
                <div class="text">关系1</div>
                <div class="choice-info">
                  <span>{{relation}}</span>
                  <div class="icon-right-arrow"></div>
                </div>
              </div>
              <choice :text="relationdata" ref="choice3" @cancel="showToggleCancel(2)" :checkedValue="defaultRelation"></choice>
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
              <div class="choice" @click.stop="showToggle(3,$event)">
                <div class="text">关系2</div>
                <div class="choice-info">
                  <span>{{relationship}}</span>
                  <div class="icon-right-arrow"></div>
                </div>
              </div>
              <choice :text="relationshipdata" ref="choice4" @cancel="showToggleCancel(3)" :checkedValue="defaultRelationship"></choice>
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
      </scroll>
      <city ref="city" @getDistrict="valDistrict" @getCity="valCity" @getProvince="valProvince"></city>
      <prompt :message="messageText" ref="prompt"></prompt>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import Choice from 'base/choice/choice'
  import City from 'base/city/city'
  import Prompt from 'base/prompt/prompt'
  import {mapMutations} from 'vuex'
  import Scroll from 'base/scroll/scroll'

  export default {
    components: {
      Choice,
      City,
      Prompt,
      Scroll
    },
    mounted () {
      let site = localStorage.getItem('defaultEd')
      this.defaultEducation = site
      this.getCheckedEducation(this.defaultEducation)

      let site2 = localStorage.getItem('defaultIn')
      this.defaultIncome = site2
      this.getCheckedIncome(this.defaultIncome)

      let site3 = localStorage.getItem('defaultRe')
      this.defaultRelation = site3
      this.getCheckedRelation(this.defaultRelation)

      let site4 = localStorage.getItem('defaultReSh')
      this.defaultRelationship = site4
      this.getCheckedRelationship(this.defaultRelationship)

      let site5 = localStorage.getItem('defaultNa')
      this.defaultNature = site5
      this.getCheckedNature(this.defaultNature)

      let site6 = localStorage.getItem('defaultLi')
      this.defaultLiabilities = site6
      this.getCheckedLiabilities(this.defaultLiabilities)

      let address = localStorage.getItem('address')
      this.addressval = address

      let company = localStorage.getItem('company')
      this.unitName = company

      let realname = localStorage.getItem('realname')
      this.realName = realname

      let fullname = localStorage.getItem('fullname')
      this.fullName = fullname

      let phonenumber = localStorage.getItem('phonenumber')
      this.phoneNumber = phonenumber

      let phonenum = localStorage.getItem('phonenum')
      this.phoneNum = phonenum

      let areas = localStorage.getItem('area')
      this.area = areas
      if (this.area === null) {
        this.area = '请选择'
      }

      let citys = localStorage.getItem('city')
      this.city = citys
      if (this.city === null) {
        this.city = ''
      }

      let provinces = localStorage.getItem('province')
      this.province = provinces
      if (this.province === null) {
        this.province = ''
      }
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
        naturedata: [
          {
            name: '私营业主',
            id: 1,
            radioName: 'naturedata'
          },
          {
            name: '上班族',
            id: 2,
            radioName: 'naturedata'
          },
          {
            name: '个体工商户',
            id: 3,
            radioName: 'naturedata'
          },
          {
            name: '自由职业者',
            id: 4,
            radioName: 'naturedata'
          },
          {
            name: '农民',
            id: 5,
            radioName: 'naturedata'
          }
        ],
        liabilitiesdata: [
          {
            name: '无负债',
            id: 1,
            radioName: 'liabilitiesdata'
          },
          {
            name: '0-3000元',
            id: 2,
            radioName: 'liabilitiesdata'
          },
          {
            name: '3000元以上',
            id: 3,
            radioName: 'liabilitiesdata'
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
            radioName: 'relationdata2'
          },
          {
            name: '朋友',
            id: 11,
            radioName: 'relationdata2'
          },
          {
            name: '同学',
            id: 12,
            radioName: 'relationdata2'
          },
          {
            name: '其它',
            id: 13,
            radioName: 'relationdata2'
          }
        ],
        historyDataInfo: [],
        education: '请选择',
        income: '请选择',
        relation: '请选择',
        relationship: '请选择',
        area: '请选择',
        natureWork: '请选择',
        liabilities: '请选择',
        city: '',
        province: '',
        messageText: '',
        addressval: '',
        unitName: '',
        realName: '',
        phoneNumber: '',
        fullName: '',
        phoneNum: '',
        defaultEducation: '',
        defaultIncome: '',
        defaultNature: '',
        defaultRelation: '',
        defaultRelationship: '',
        defaultLiabilities: '',
        jsonData: [],
        collapse: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ]
      }
    },
    methods: {
      addevent () {
        document.addEventListener('tap', this._currentData, true)
        document.addEventListener('tap', this._currentData2, true)
        document.addEventListener('tap', this._currentData3, true)
        document.addEventListener('tap', this._currentData4, true)
        document.addEventListener('tap', this._currentData5, true)
        document.addEventListener('tap', this._currentData6, true)
      },
      _currentData (event) {
        var focusTargetDom = event.target
        if (focusTargetDom.tagName.toLowerCase() === 'input' && focusTargetDom.getAttribute('name') === 'checkdata') {
          this.defaultEducation = focusTargetDom.value
          localStorage.setItem('defaultEd', this.defaultEducation)
          this.getCheckedEducation(focusTargetDom.value)
        }
      },
      _currentData2 (event) {
        var focusTargetDom = event.target
        if (focusTargetDom.tagName.toLowerCase() === 'input' && focusTargetDom.getAttribute('name') === 'incomedata') {
          this.defaultIncome = focusTargetDom.value
          localStorage.setItem('defaultIn', this.defaultIncome)
          this.getCheckedIncome(focusTargetDom.value)
        }
      },
      _currentData3 (event) {
        var focusTargetDom = event.target
        if (focusTargetDom.tagName.toLowerCase() === 'input' && focusTargetDom.getAttribute('name') === 'relationdata') {
          this.defaultRelation = focusTargetDom.value
          localStorage.setItem('defaultRe', this.defaultRelation)
          this.getCheckedRelation(focusTargetDom.value)
        }
      },
      _currentData4 (event) {
        var focusTargetDom = event.target
        if (focusTargetDom.tagName.toLowerCase() === 'input' && focusTargetDom.getAttribute('name') === 'relationdata2') {
          this.defaultRelationship = focusTargetDom.value
          localStorage.setItem('defaultReSh', this.defaultRelationship)
          this.getCheckedRelationship(focusTargetDom.value)
        }
      },
      _currentData5 (event) {
        var focusTargetDom = event.target
        if (focusTargetDom.tagName.toLowerCase() === 'input' && focusTargetDom.getAttribute('name') === 'naturedata') {
          this.defaultNature = focusTargetDom.value
          localStorage.setItem('defaultNa', this.defaultNature)
          this.getCheckedNature(focusTargetDom.value)
        }
      },
      _currentData6 (event) {
        var focusTargetDom = event.target
        if (focusTargetDom.tagName.toLowerCase() === 'input' && focusTargetDom.getAttribute('name') === 'liabilitiesdata') {
          this.defaultLiabilities = focusTargetDom.value
          console.log(this.defaultLiabilities)
          localStorage.setItem('defaultLi', this.defaultLiabilities)
          this.getCheckedLiabilities(focusTargetDom.value)
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
          this.relationship = '其它'
        }
      },
      getCheckedLiabilities (val) {
        if (val === '1') {
          this.liabilities = '无负债'
        } else if (val === '2') {
          this.liabilities = '0-3000元'
        } else if (val === '3') {
          this.liabilities = '3000元以上'
        }
      },
      getCheckedNature (val) {
        if (val === '1') {
          this.natureWork = '私营业主'
        } else if (val === '2') {
          this.natureWork = '上班族'
        } else if (val === '3') {
          this.natureWork = '个体工商户'
        } else if (val === '4') {
          this.natureWork = '自由职业者'
        } else if (val === '5') {
          this.natureWork = '农民'
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
        localStorage.setItem('area', val)
      },
      valCity (val) {
        this.city = val
        localStorage.setItem('city', val)
      },
      valProvince (val) {
        this.province = val
        localStorage.setItem('province', val)
      },
      aggregateShow () {
        return `${this.province} ${this.city} ${this.area}`
      },
      showToggleCancel (num) {
        this.$refs[`choice${num + 1}`].hide()
        this.collapse[num].show = false
      },
      showToggle (num, event) {
        const show = this.collapse[num].show
        if (show) {
          this.closeCollapse(event)
          this.$refs[`choice${num + 1}`].hide()
        } else {
          this.openCollapse(event)
          this.$refs[`choice${num + 1}`].show()
        }
        this.collapse[num].show = !show
      },
      closeCollapse (event) {
        let ulElement = event.currentTarget.nextElementSibling
        let children = ulElement.getElementsByTagName('div')[0]
        ulElement.style.height = children.offsetHeight + 'px'
        setTimeout(() => {
          ulElement.style.height = '0px'
          setTimeout(() => {
            ulElement.style.display = 'none'
            this.$refs.dataWrapper.refresh()
          }, 300)
        }, 10)
      },
      openCollapse (event) {
        let ulElement = event.currentTarget.nextElementSibling
        let children = ulElement.getElementsByTagName('div')[0]
        ulElement.style.display = 'block'
        ulElement.style.height = children.offsetHeight + 'px'
        setTimeout(() => {
          ulElement.style.height = 'auto'
          this.$refs.dataWrapper.refresh()
        }, 300)
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
          localStorage.setItem('address', this.addressval)
          localStorage.setItem('company', this.unitName)
          localStorage.setItem('realname', this.realName)
          localStorage.setItem('fullname', this.fullName)
          localStorage.setItem('phonenumber', this.phoneNumber)
          localStorage.setItem('phonenum', this.phoneNum)
          this.statePersonalData(true)
          this.messageText = '提交成功'
          this._submit()
          setTimeout(() => {
            this.$router.back()
          }, 2000)
        }
      },
      _submit () {
        this.$refs.prompt.show()
        setTimeout(() => {
          this.$refs.prompt.close()
        }, 2000)
      },
      ...mapMutations({
        statePersonalData: 'SET_STATE_PERSONAL_DATA'
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
        .title-info
          padding :1rem 1.5rem
          font-size :$font-size-small
          color :$color-text-x
          background :$color-background
  .bgc
    background-color :$color-background
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
    padding-bottom :5rem
    .btn
      border-radius: .3rem
      font-size: $font-size-medium-x
      color: #fff
      width :100%
      height :5rem
      line-height :5rem
      background: $color-blue
  #selectVal
    border: none
    appearance:none
    -moz-appearance:none
    -webkit-appearance:none
    direction: rtl
</style>
