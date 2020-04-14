import EventService from '@/services/EventService'

export const state = {
  events: [],
  total: 0,
  event: { }
}

export const namespaced = true

export const mutations = {
  ADD_EVENT (state, event) {
    state.events.push(event)
  },
  SET_EVENTS (state, events) {
    state.events = events
  },
  GET_TOTAL_EVENTS_COUNTS (state, total) {
    state.total = total
  },
  SET_EVENT (state, event) {
    state.event = event
  }
}

export const actions = {
  createEvent ({ commit }, event) {
    return EventService.postEvent(event).then(() => {
      commit('ADD_EVENT', event)
    })
  },
  fetchEvents ({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_EVENTS', response.data)
        commit('GET_TOTAL_EVENTS_COUNTS', Number(response.headers['x-total-count']))
        // this.events = response.data
      })
      .catch(error => console.error(error))
  },
  fetchEvent ({ commit, getters }, id) {
    const event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}

export const getters = {
  catLength: state => {
    return state.categories.length
  },
  getEventById: (state) => (id) => {
    return state.events.find(event => event.id === id)
  }
}
