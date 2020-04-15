import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import EventList from '../views/EventList'
import EventShow from '../views/EventShow.vue'
import EventCreate from '../views/EventCreate.vue'
import User from '../views/User'
import NProgress from 'nprogress'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    beforeEnter: (routeTo, routeFrom, next) => {
      store.dispatch('event/fetchEvent', routeTo.params.id)
        .then(() => {
          next()
        })
    }
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate
  },
  {
    path: '/user/:username',
    name: 'user',
    component: User,
    props: true
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
