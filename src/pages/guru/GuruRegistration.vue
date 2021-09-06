<template>
  <section>
    <base-card>
      <h2>Register as a guru now!</h2>
      <guru-form @save-data="saveData"></guru-form>
    </base-card>
  </section>
</template>

<script>
import GuruForm from '../../components/guru/GuruForm.vue'

export default {
  components: {
    GuruForm
  },

  methods: {
    saveData (data) {
      this.$store.dispatch('guru/registerGuru', data)
      this.$router.replace('/guru')
    }
  }
}
</script>
