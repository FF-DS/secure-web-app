import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/routes/routes/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    }
  ].concat(routes)
})

export default router