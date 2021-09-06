<template lang="">
  <div>
    <the-header></the-header>
    <router-view v-slot="slotProps" class="rv">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
</template>
<script>
import TheHeader from './components/layout/TheHeader.vue'
export default {
  components: { TheHeader },
  created () {
    this.$store.dispatch('autoLogin')
  },
  computed: {
    didAutoLogout () {
      return this.$store.getters.didAutoLogout
    }
  },
  watch: {
    didAutoLogout (curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace('/guru')
      }
    }
  }
}
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

.rv {
  background-image: url('./assets/all_religions.png');
  background-repeat: no-repeat;
  background-position: 50% 180px;
  background-size: 950px;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-out;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
