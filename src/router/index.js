import Vue from 'vue'
import VueRouter from 'vue-router'

import auth from '@/router/user'
import dashboard from '@/router/dashboard'
import sample from '@/router/sample'
import temp from '@/router/tempDir'

Vue.use(VueRouter)

// const requireAuth = () => (to, from, next) => {
//   if (store.state.accessToken !== '') {
//     return next()
//   }
//   next('/login')
// }

const routes = [
  ...auth,
  ...dashboard,
  ...sample,
  ...temp, // 추후 삭제 예정
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
