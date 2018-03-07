import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '../components/recommend/recommend'
import Card from '../components/card/card'
import MiaoLa from '../components/miaola/miaola'
import Progress from '../components/progress/progress'
import Repayment from '../components/repayment/repayment'
import Personal from '../components/personal/personal'
import Plan from '../components/plan/plan'
import Coupon from '../components/coupon/coupon'
import Message from '../components/message/message'
import PersonalData from '../components/personal-data/personal-data'
import Data from '../components/data/data'
import IdCard from '../components/idcard/idcard'
import Directory from '../components/directory/directory'
import Zhima from '../components/zhima/zhima'
import CreditCard from '../components/credit-card/credit-card'
import CardInfo from '../components/card-info/card-info'
import Login from '../components/login/login'
import ConfirmLoan from '../components/confirm-loan/confirm-loan'
import DepositoryCard from '../components/depository-card/depository-card'
import Validate from '../components/validate/validate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/validate',
      component: Validate
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: 'card',
          component: Card,
          children: [
            {
              path: 'personal-data',
              component: PersonalData,
              meta: {
                requiresAuth: true
              },
              children: [
                {
                  path: 'data',
                  component: Data
                },
                {
                  path: 'idcard',
                  component: IdCard
                },
                {
                  path: 'directory',
                  component: Directory
                },
                {
                  path: 'zhima',
                  component: Zhima
                },
                {
                  path: 'credit-card',
                  component: CreditCard,
                  children: [
                    {
                      path: 'card-info',
                      component: CardInfo
                    }
                  ]
                },
                {
                  path: 'confirm-loan',
                  component: ConfirmLoan,
                  children: [
                    {
                      path: 'depository-card',
                      component: DepositoryCard
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          path: 'miaola',
          component: MiaoLa,
          children: [
            {
              path: 'personal-data',
              component: PersonalData,
              meta: {
                requiresAuth: true
              },
              children: [
                {
                  path: 'data',
                  component: Data
                },
                {
                  path: 'idcard',
                  component: IdCard
                },
                {
                  path: 'directory',
                  component: Directory
                },
                {
                  path: 'zhima',
                  component: Zhima
                },
                {
                  path: 'credit-card',
                  component: CreditCard,
                  children: [
                    {
                      path: 'card-info',
                      component: CardInfo
                    }
                  ]
                },
                {
                  path: 'confirm-loan',
                  component: ConfirmLoan,
                  children: [
                    {
                      path: 'depository-card',
                      component: DepositoryCard
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/progress',
      component: Progress
    },
    {
      path: '/repayment',
      component: Repayment,
      children: [
        {
          path: 'plan',
          component: Plan
        }
      ]
    },
    {
      path: '/personal',
      component: Personal,
      children: [
        {
          path: 'coupon',
          component: Coupon
        },
        {
          path: 'message',
          component: Message
        }
      ]
    }
  ]
})
