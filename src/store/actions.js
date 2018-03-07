import * as types from './mutation-types'

export const selectLoan = function ({commit, state}, {list, index}) {
  commit(types.SET_LOAN_LIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_SEARCH_FULL_SCREEN, true)
}

export const selectSearch = function ({commit}) {
  commit(types.SET_SEARCH_FULL_SCREEN, true)
}

