import * as types from './mutation-types'

const mutations = {
  [types.SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [types.SET_SEARCH_FULL_SCREEN] (state, flag) {
    state.searchFullScreen = flag
  },
  [types.SET_LOAN_LIST] (state, list) {
    state.loanList = list
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_STATE_PERSONAL_DATA] (state, flag) {
    state.statePersonalData = flag
  },
  [types.SET_USER_INFO] (state, newUserInfo) {
    state.userInfo = newUserInfo
  },
  [types.SET_CHOICE_SHOW_ONE] (state, flag) {
    state.choiceShowOne = flag
  },
  [types.SET_CHOICE_SHOW_TWO] (state, flag) {
    state.choiceShowTwo = flag
  },
  [types.SET_CHOICE_SHOW_THREE] (state, flag) {
    state.choiceShowThree = flag
  },
  [types.SET_CHOICE_SHOW_FOUR] (state, flag) {
    state.choiceShowFour = flag
  },
  [types.SET_CHOICE_SHOW_MIAO] (state, flag) {
    state.choiceShowMiao = flag
  },
  [types.SET_STATE_PHOTO] (state, flag) {
    state.statePhoto = flag
  },
  [types.SET_STATE_COMMUNIC] (state, flag) {
    state.stateCommunic = flag
  },
  [types.SET_STATE_BANK_CARD] (state, flag) {
    state.stateBankCard = flag
  },
  [types.SET_ADD_BANK_CARD] (state, flag) {
    state.addBankCard = flag
  },
  [types.SET_ID_VALIDATE] (state, flag) {
    state.idValidate = flag
  }
}
export default mutations
