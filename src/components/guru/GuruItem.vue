<template>
  <li>
    <h3>
      {{ fullName }}
    </h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <base-badge
        :type="area"
        :title="area"
        v-for="area in areas"
        :key="area"
      ></base-badge>
    </div>
    <div class="actions">
      <base-button link mode="outline" :to="guruContactLink"
        >Contact</base-button
      >
      <base-button link :to="guruDetailsLink">View Details</base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
  computed: {
    fullName () {
      return this.firstName + ' ' + this.lastName
    },
    guruContactLink () {
      return this.$route.path + '/' + this.id + '/contact'
    },
    guruDetailsLink () {
      return this.$route.path + '/' + this.id
    }
  }
}
</script>

<style scoped lang="scss">
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}
h3 {
  font-size: 1.5rem;
}
h4 {
  margin: 0.5rem 0;
}
div {
  margin: 0.5rem 0;
}
.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
