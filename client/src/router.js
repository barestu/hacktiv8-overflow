import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Discussions from './views/Discussions'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/question/:id',
      name: 'discussions',
      props: true,
      component: Discussions
    }
  ]
})
