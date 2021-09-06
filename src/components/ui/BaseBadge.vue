<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: ['type', 'title'],
  computed: {
    text () {
      return this.title.toUpperCase()
    }
  }
}
</script>

<style lang="scss" scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.christianity {
  background-color: rgba(100, 0, 0, 1);
  color: white;
}

.islam {
  background-color: rgba(2, 155, 2, 1);
  color: white;
}

.taoism {
  background-color: black;
  color: white;
}

.guidence {
  background-color: goldenrod;
  color: black;
}
</style>
