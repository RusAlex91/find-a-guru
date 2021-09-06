export default {
  async registerGuru (context, data) {
    const userId = context.rootGetters.userId
    const guruData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    }

    const token = context.rootGetters.token

    const response = await fetch(
      `https://find-guru-default-rtdb.europe-west1.firebasedatabase.app/guru/${userId}.json?auth=${token}`,
      { method: 'PUT', body: JSON.stringify(guruData) }
    )
    // const responseData = await response.json()

    if (!response.ok) {
      console.log(response)
    }
    context.commit('registerGuru', {
      ...guruData,
      id: userId
    })
  },
  async loadGurus (context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return
    }
    const response = await fetch(
      'https://find-guru-default-rtdb.europe-west1.firebasedatabase.app/guru.json'
    )
    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.massage || 'failed to fetch')
      throw error
    }

    const gurus = []
    for (const key in responseData) {
      const guru = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      }
      gurus.push(guru)
    }

    context.commit('setGuru', gurus)
    context.commit('setFetchTimestamp', gurus)
  }
}
