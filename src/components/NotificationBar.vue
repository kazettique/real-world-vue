<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      timeout: null
    }
  },
  beforeDestroy () {
    clearTimeout(this.timeout)
  },
  mounted () {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000)
  },
  computed: {
    notificationTypeClass () {
      return `-text-${this.notification.type}`
    }
  },
  methods: mapActions('notification', ['remove'])
}
</script>

<style lang="scss" scoped>
.notification-bar {
  margin: 1rem 0 1rem;
}
</style>
