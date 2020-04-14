<template>
  <div>
    <h1>Events for {{ user.name }} </h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <template v-if="page !== 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev Page</router-link
      >
      |
    </template>
    <template v-if="page < lastPage">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="prev"
        >Next Page</router-link
      >
    </template>
    <BaseIcon />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
// import EventService from '@/services/EventService'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },
  data () {
    return {
      // events: []
      perPage: 3
    }
  },
  created () {
    this.$store.dispatch('fetchEvents', {
      perPage: this.perPage,
      page: this.page
    })
  },
  computed: {
    page () {
      return parseInt(this.$route.query.page) || 1
    },
    lastPage () {
      return Math.ceil(this.total / this.perPage)
    },
    ...mapState(['events', 'total', 'user'])
  }
}
</script>
