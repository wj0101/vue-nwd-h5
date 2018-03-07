<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'

  export default {
    name: 'app',
    data () {
      return {
        isLogin: false,
        userInfo: {
          nick: null,
          ulevel: null,
          uid: null,
          portrait: null
        }
      }
    },
    mounted () {
      // 组件开始挂载时获取用户信息
      this.getUserInfo()
    },
    methods: {
      getUserInfo () {
        this.userInfo = {
          nick: 'helloworld',
          ulevel: 20,
          iphone: '138****2044',
          portrait: 'images/profile.png'
        }
        /*
        ts.$http.get(url, {
          //参数
          "params":{}
        }).then((response) => {
          if(response.data.code == 0){
            this.$store.commit('updateUserInfo', this.userInfo);
          }
        }, (response) => {
          //Error
        })
        */
        // 提交mutation到Store
        this.setUserInfo(this.userInfo)
      },
      ...mapMutations({
        setUserInfo: 'SET_USER_INFO'
      })
    }
  }
</script>
