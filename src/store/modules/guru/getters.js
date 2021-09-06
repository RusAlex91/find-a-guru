export default {
  guru (state) {
    return state.guru
  },
  hasGuru (state) {
    return state.guru && state.guru.length > 0
  },
  isGuru (_, getters, _2, rootGetters) {
    const guru = getters.guru
    const userId = rootGetters.userId
    return guru.some(guru => guru.id === userId)
  },
  shouldUpdate (state) {
    const lastFetch = state.lastFetch
    if (!lastFetch) {
      return true
    }
    const currentTimeStamp = new Date().getTime()
    console.log('its updated')
    return (currentTimeStamp - lastFetch) / 1000 > 60
  }
}
