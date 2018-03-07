// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import router from './router'
import 'common/stylus/index.styl'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
import Vuex from 'vuex'
import vueCookie from 'vue-cookie'
import VueJsonp from 'vue-jsonp'

Vue.use(VueJsonp)
Vue.use(vueCookie)
Vue.use(Vuex)
Vue.prototype.$ajax = axios
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})
Vue.use(VueResource)
Vue.use(VueAwesomeSwiper)

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router,
  watch: {
    '$route': 'checkLogin'
  },
  created () {
    this.checkLogin
    this.redrct()
  },
  methods: {
    checkLogin () {
      // 检查是否存在session
      if (!this.$cookie.get('session')) {
        this.$router.push('/login')
      }
    },
    redrct () {
      router.beforeEach((to, from, next) => {
        if (to.matched.some(record => record.meta.requiresAuth)) {
          if (!this.getid()) {
            next({
              path: '/validate', // 重定向后的路由
              query: { redirect: to.fullPath } // 登录成功之后可以根据query中的内容跳转回原来的路由(页面)
            })
          } else {
            next()
          }
        } else {
          next()
        }
      })
    },
    getid () {
      let id = localStorage.getItem('cardId')
      if (id === null) {
        return false
      }
      return true
    }
  }
})
