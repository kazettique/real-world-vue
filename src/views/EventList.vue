<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page !== 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">
        Prev Page
      </router-link>
      |
    </template>
    <template v-if="hasNextPage">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 } }" rel="prev">Next Page</router-link>
    </template>
    <BaseIcon />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
// import EventService from '@/services/EventService'
import { mapState } from 'vuex'
import store from '@/store'

function getPageEvents (routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1
  store.dispatch('event/fetchEvents', {
    page: currentPage
  }).then(() => {
    routeTo.params.page = currentPage
    next()
  })
}

export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  // data () {
  //   return {
  //     // events: []
  //     perPage: 3
  //   }
  // },
  beforeRouteEnter (routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate (routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  computed: {
    // page () {
    //   return parseInt(this.$route.query.page) || 1
    // },
    hasNextPage () {
      return this.event.eventsTotal > this.page * this.event.perPage
    },
    ...mapState(['event', 'user'])
  }
}
</script>
