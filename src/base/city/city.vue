<template>
  <div class="myAddress">
    <section>
      <section class="cont" @click.stop="showToggleCity">
        <div class="text">居住地址</div>
        <div class="choice-info">
          <span>{{Province?Province:''}} {{City?City:''}} {{District?District:''}}</span>
          <div class="icon-right-arrow"></div>
        </div>
      </section>
    </section>
    <section class="showChose" v-show="showChose">
      <section class="address">
        <section class="title text-top">
          <h4>居住地址</h4>
          <span @click="closeAdd()">×</span>
        </section>
        <section class="title">
          <div class="area" @click="provinceSelected()">{{Province?Province:this.info.name}}</div>
          <div class="area" @click="citySelected()" :class="City?'':'active'">{{City?City:'请选择'}}</div>
          <div class="area" @click="districtSelected()" :class="District?'':'active'" v-show="City">{{District?District:'请选择'}}</div>
        </section>
        <ul>
          <li class="addList" v-for="(v,k) in info" @click="getProvinceId(v.id, v.name, k)" v-show="showProvince" :class="v.selected ? 'active' : ''">{{v.name}}</li>
          <li class="addList" v-for="(v,k) in showCityList" @click="getCityId(v.id, v.name, k)" v-show="showCity" :class="v.selected ? 'active' : ''">{{v.name}}</li>
          <li class="addList" v-for="(v,k) in showDistrictList" @click="getDistrictId(v.id, v.name, k)" v-show="showDistrict" :class="v.selected ? 'active' : ''">{{v.name}}</li>
        </ul>
      </section>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'myAddress',
    data () {
      return {
        showChose: false,
        showProvince: true,
        showCity: false,
        showDistrict: false,
        showCityList: false,
        showDistrictList: false,
        province: 5,
        city: 3,
        district: 57,
        GetProvinceId: 2,
        District: false,
        Province: false,
        City: false,
        // v-for循环判断是否为当前
        selected: false,
        info: []
      }
    },
    methods: {
      showAdd () {
        this.showChose = true
      },
      closeAdd () {
        this.showChose = false
      },
      showToggleCity () {
        this.showChose = true
      },
      _filter (add, name, code) {
        let result = []
        for (let i = 0; i < add.length; i++) {
          if (code === add[i].id) {
            result = add[i][name]
          }
        }
        return result
      },
      getProvinceId (code, input, index) {
        this.province = code
        this.Province = input
        this.showProvince = false
        this.showCity = true
        this.showDistrict = false
        this.showCityList = this._filter(this.info, 'city', this.province)
        // 点击选择当前
        this.info.map(a => (a.selected = false))
        this.info[index].selected = true
      },
      provinceSelected () {
        // 清除市级和区级列表
        this.showCityList = false
        this.showDistrictList = false
        // 清除市级和区级选
        this.City = false
        this.District = false
        // 选项页面的切
        this.showProvince = true
        this.showCity = false
        this.showDistrict = false
      },
      getCityId (code, input, index) {
        this.city = code
        this.City = input
        this.showProvince = false
        this.showCity = false
        this.showDistrict = true
        this.showDistrictList = this._filter(this.showCityList, 'district', this.city)
        // 选择当前添加active
        this.showCityList.map(a => (a.selected = false))
        this.showCityList[index].selected = true
      },
      citySelected () {
        this.showProvince = false
        this.showCity = true
        this.showDistrict = false
      },
      getDistrictId (code, input, index) {
        this.district = code
        this.District = input
        // 选择当前添加active
        this.showDistrictList.map(a => (a.selected = false))
        this.showDistrictList[index].selected = true
        // 选取市区选项之后关闭弹层
        this.showChose = false
      },
      districtSelected () {
        this.showProvince = false
        this.showCity = false
        this.showDistrict = true
      },
      getCityData () {
        this.$ajax.get('/static/citydata.json?t=' + (new Date()).getTime().toString()).then((response) => {
          this.info = response.data.list
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    created () {
      this.getCityData()
      this.$watch('District', (newquery) => {
        this.$emit('getDistrict', newquery)
      })
      this.$watch('City', (newquery) => {
        this.$emit('getCity', newquery)
      })
      this.$watch('Province', (newquery) => {
        this.$emit('getProvince', newquery)
      })
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"

  .cont
    display :flex
    flex-direction: row
    justify-content :space-between
    padding :1.5rem 1.5rem 1.5rem 0
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
  .showChose
    width:100%
    height:100%
    position:fixed
    top:0
    left:0
    z-index:120
    background:rgba(77,82,113,0.8)
  .address
    position:absolute
    bottom:0
    left:0
    z-index:121
    background:#fff
    width:100%


  .title{
    position: relative;
  }
  .text-top {
    text-align: center;
  }
  .title h4{
    display:inline-block;
    font-size:1.6rem;
    line-height:5rem;
    font-weight:normal;
    color:#999;
    height: 5rem;
  }
  .title span{
    font-size:3rem;
    position: absolute;
    top: 0;
    right: 0;
    padding: .5rem;
    color:#D8D8D8;
  }
  .area{
    display:inline-block;
    font-size:1.6rem;
    line-height:1.5;
    margin:1rem;
    color:#333;
  }
  .addList{
    width:100%;
    padding-left:1rem;
    font-size:1.6rem;
    line-height:2;
    color:#333;
  }
  /* 修改的格式 */
  .address ul{
    width:95%;
    height:100%;
    max-height: 20rem;
    overflow:auto;
    overflow-x: hidden
  }
  .address ul li{
    margin-left:5%;
  }
  .address .title .active{
    color:#0071B8;
    border-bottom:0.1rem solid #0071B8;
  }
  .address ul .active{
    color:#0071B8;
  }

</style>
