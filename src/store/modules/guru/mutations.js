export default {
  registerGuru (state, payload) {
    state.guru.push(payload)
  },
  setGuru (state, payload) {
    state.guru = payload
  },
  setFetchTimestamp (state) {
    state.lastFetch = new Date().getTime()
  }
}
