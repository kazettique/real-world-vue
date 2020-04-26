<template>
  <div>
    <BaseSelect
      label="Select a category"
      :options="categories"
      v-model="event.category"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
      event: this.createFreshEventObject()
    }
  },
  methods: {
    createFreshEventObject () {
      const user = { name: 'John' }
      const id = '5566'

      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
