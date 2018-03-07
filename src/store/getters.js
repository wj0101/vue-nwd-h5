export const fullScreen = state => state.fullScreen

export const searchFullScreen = state => state.searchFullScreen

export const loanList = state => state.loanList

export const currentIndex = state => state.currentIndex

export const currentLoan = state => {
  return state.loanList[state.currentIndex] || {}
}

export const statePersonalData = state => state.statePersonalData

export const userInfo = state => state.userInfo

export const choiceShowOne = state => state.choiceShowOne

export const choiceShowTwo = state => state.choiceShowTwo

export const choiceShowThree = state => state.choiceShowThree

export const choiceShowFour = state => state.choiceShowFour

export const choiceShowMiao = state => state.choiceShowMiao

export const statePhoto = state => state.statePhoto

export const stateCommunic = state => state.stateCommunic

export const stateBankCard = state => state.stateBankCard

export const addBankCard = state => state.addBankCard

export const idValidate = state => state.idValidate
