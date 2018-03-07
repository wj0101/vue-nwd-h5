import {mapGetters} from 'vuex'

export const choiceShowMixin = {
  computed: {
    ...mapGetters([
      'choiceShowOne',
      'choiceShowTwo',
      'choiceShowThree',
      'choiceShowFour',
      'choiceShowMiao'
    ])
  },
  mounted () {
    this.handlePlaylist(this.choiceShowOne)
    this.handlePlaylist(this.choiceShowTwo)
    this.handlePlaylist(this.choiceShowThree)
    this.handlePlaylist(this.choiceShowFour)
    this.handlePlaylist(this.choiceShowMiao)
  },
  activated () {
    this.handlePlaylist(this.choiceShowOne)
    this.handlePlaylist(this.choiceShowTwo)
    this.handlePlaylist(this.choiceShowThree)
    this.handlePlaylist(this.choiceShowFour)
    this.handlePlaylist(this.choiceShowMiao)
  },
  watch: {
    choiceShowOne (nexVal) {
      this.handlePlaylist(nexVal)
    },
    choiceShowTwo (nexVal) {
      this.handlePlaylist(nexVal)
    },
    choiceShowThree (nexVal) {
      this.handlePlaylist(nexVal)
    },
    choiceShowFour (nexVal) {
      this.handlePlaylist(nexVal)
    },
    choiceShowMiao (nexVal) {
      this.handlePlaylist(nexVal)
    }
  },
  methods: {
    handlePlaylist () {
      throw new Error('component must implement handlePlaylist')
    }
  }
}
