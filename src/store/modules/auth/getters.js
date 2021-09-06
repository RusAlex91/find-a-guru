export default {
  userId (state) {
    return state.userId
  },
  token (state) {
    return state.token
  },
  isAuthenticated (state) {
    // convert to boolean
    return !!state.token
  },
  didAutoLogout (state) {
    return state.didAutoLogout
  }
}
