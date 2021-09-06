<template>
  <base-card>
    <h2>Find Your Guru</h2>
    <span class="filter-option">
      <input
        type="checkbox"
        name=""
        id="christianity"
        checked
        @change="setFilter"
      />
      <label for="christianity">Christianity</label>
      <input type="checkbox" name="" id="islam" checked @change="setFilter" />
      <label for="islam">Islam</label>
      <input type="checkbox" name="" id="taoism" checked @change="setFilter" />
      <label for="taoism">Taoism</label>
      <input
        type="checkbox"
        name=""
        id="guidence"
        checked
        @change="setFilter"
      />
      <label for="guidence">Guidence</label>
    </span>
  </base-card>
</template>
<script>
export default {
  emits: ['change-filter'],
  data () {
    return {
      filters: {
        christianity: true,
        islam: true,
        taoism: true
      }
    }
  },
  methods: {
    setFilter (event) {
      const inputId = event.target.id
      const isActive = event.target.checked
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive
      }
      this.filters = updatedFilters

      this.$emit('change-filter', updatedFilters)
    }
  }
}
</script>
<style scoped lang="scss">
h2 {
  margin: 0.5rem 0;
}
.filter-option {
  margin-right: 1rem;
  label {
    vertical-align: middle;
    margin-left: 0.25rem;
  }
  input {
    vertical-align: middle;
  }
}
.filter-option.active {
  label {
    font-weight: bold;
  }
}
</style>
