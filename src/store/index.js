import { createStore } from 'vuex'

import guruModule from './modules/guru/index.js'

import requestsModules from './modules/requests/index.js'

import authModule from './modules/auth/index.js'

const store = createStore({
  modules: {
    guru: guruModule,
    requests: requestsModules,
    auth: authModule
  }
})

export default store
