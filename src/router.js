import { defineAsyncComponent } from '@vue/runtime-core'
import { createRouter, createWebHistory } from 'vue-router'

import NotFound from './pages/NotFound.vue'

// import GuruDetails from './pages/guru/GuruDetails.vue'
import GuruList from './pages/guru/GuruList.vue'
import GuruRegistration from './pages/guru/GuruRegistration.vue'

import GuruContact from './pages/requests/GuruContact.vue'
import GuruRequestsReceived from './pages/requests/GuruRequestsReceived.vue'
import UserAuth from './pages/auth/UserAuth.vue'

import store from './store/index'

const GuruDetails = defineAsyncComponent(() =>
  import('./pages/guru/GuruDetails.vue')
)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/guru' },
    { path: '/guru', component: GuruList },
    {
      path: '/guru/:id',
      component: GuruDetails,
      props: true,
      children: [{ path: 'contact', component: GuruContact }]
    },
    {
      path: '/register',
      component: GuruRegistration,
      meta: { requiresAuth: true }
    },
    {
      path: '/requests',
      component: GuruRequestsReceived,
      meta: { requiresAuth: true }
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound }
  ]
})

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth')
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/guru')
  } else {
    next()
  }
})
export default router
