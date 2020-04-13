import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import EventList from '../views/EventList'
import EventShow from '../views/EventShow.vue'
import EventCreate from '../views/EventCreate.vue'
import User from '../views/User'

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
    props: true
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

export default router
