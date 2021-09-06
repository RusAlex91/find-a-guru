export default {
  requests (state, _, _2, rootGetters) {
    const guruId = rootGetters.userId
    return state.requests.filter(req => req.guruId === guruId)
  },
  hasRequests (_, getters) {
    return getters.requests && getters.requests.length > 0
  },
  requestCount (state) {
    return state.requestCount
  }
}
