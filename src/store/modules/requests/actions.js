export default {
  async contactGuru (context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message
    }

    const response = await fetch(
      `https://find-guru-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.guruId}.json`,
      { method: 'POST', body: JSON.stringify(newRequest) }
    )
    const responseData = await response.json()

    newRequest.id = responseData.name
    newRequest.guruId = payload.guruId

    if (!response.ok) {
      const error = new Error(responseData.massage || 'failed to send request')
      throw error
    }

    context.commit('addRequest', newRequest)
  },
  async fetchRequests (context) {
    const token = context.rootGetters.token
    const guruId = context.rootGetters.userId
    const response = await fetch(
      `https://find-guru-default-rtdb.europe-west1.firebasedatabase.app/requests/${guruId}.json?auth=${token}`
    )
    const responseData = await response.json()
    if (!response.ok) {
      const error = new Error(responseData.massage || 'failed to send request')
      throw error
    }

    const requests = []
    for (const key in responseData) {
      const request = {
        id: key,
        guruId: guruId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      }
      requests.push(request)
    }

    context.commit('setRequests', requests)
  },
  async fetchRequestsQnty (context) {
    const token = context.rootGetters.token
    const guruId = context.rootGetters.userId

    const response = await fetch(
      `https://find-guru-default-rtdb.europe-west1.firebasedatabase.app/requests/${guruId}.json?auth=${token}`
    )
    const responseData = await response.json()
    const count = Object.keys(responseData).length
    context.commit('setRequestsCount', count)
  }
}
