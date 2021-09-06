<template>
  <div>
    <section>
      <base-card>
        <h2>
          {{ fullName }}
        </h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header v-if="!path">
          <h2>Interested? Reach out now! {{ path }}</h2>
          <base-button link :to="contactLink" @click="path = true"
            >Contact</base-button
          >
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        >
        </base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      path: false,
      selectedGuru: null
    }
  },
  computed: {
    fullName () {
      return this.selectedGuru.firstName + ' ' + this.selectedGuru.lastName
    },
    contactLink () {
      return this.$route.path + '/contact'
    },
    areas () {
      return this.selectedGuru.areas
    },
    rate () {
      return this.selectedGuru.hourlyRate
    },
    description () {
      return this.selectedGuru.description
    }
  },
  created () {
    debugger
    this.selectedGuru = this.$store.getters['guru/guru'].find(
      guru => guru.id === this.id
    )
  }
}
</script>
