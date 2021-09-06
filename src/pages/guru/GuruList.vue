<template lang="">
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <guru-filter @change-filter="setFilters"></guru-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadGurus(true)"
            >Refresh</base-button
          >
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn"
            >Login to register as Spiritual Guru</base-button
          >
          <base-button
            v-if="isLoggedIn && !isGuru && !isLoading"
            link
            to="/register"
            >Register as Guru</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner> </base-spinner>
        </div>
        <ul v-else-if="hasGuru">
          <guru-item
            v-for="guru in filteredGuru"
            :key="guru.id"
            :id="guru.id"
            :first-name="guru.firstName"
            :last-name="guru.lastName"
            :rate="guru.hourlyRate"
            :areas="guru.areas"
          ></guru-item>
        </ul>
        <h3 v-else>No guru found.</h3>
      </base-card>
    </section>
  </div>
</template>
<script>
import GuruItem from '../../components/guru/GuruItem.vue'
import GuruFilter from '../../components/guru/GuruFilter.vue'

export default {
  components: {
    GuruItem,
    GuruFilter
  },
  data () {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        christianity: true,
        islam: true,
        taoism: true
      }
    }
  },
  computed: {
    filteredGuru () {
      const guru = this.$store.getters['guru/guru']
      return guru.filter(guru => {
        if (
          this.activeFilters.christianity &&
          guru.areas.includes('christianity')
        ) {
          return true
        } else if (this.activeFilters.islam && guru.areas.includes('islam')) {
          return true
        } else if (this.activeFilters.taoism && guru.areas.includes('taoism')) {
          return true
        } else if (
          this.activeFilters.guidence &&
          guru.areas.includes('guidence')
        ) {
          return true
        } else {
          return false
        }
      })
    },

    isGuru () {
      return this.$store.getters['guru/isGuru']
    },

    hasGuru () {
      return !this.isLoading && this.$store.getters['guru/hasGuru']
    },
    isLoggedIn () {
      return this.$store.getters.isAuthenticated
    }
  },
  created () {
    this.loadGurus()
  },
  methods: {
    setFilters (updatedFilters) {
      this.activeFilters = updatedFilters
    },
    async loadGurus (refresh = false) {
      this.isLoading = true
      try {
        await this.$store.dispatch('guru/loadGurus', {
          forseRefresh: refresh
        })
      } catch (error) {
        this.error = error.message || 'something went wrong'
      }

      this.isLoading = false
    },
    handleError () {
      this.error = null
    }
  }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Georama:wght@400;700&display=swap');

html {
  font-family: 'Georama', sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
