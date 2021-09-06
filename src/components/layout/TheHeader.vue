<template lang="">
  <header>
    <nav>
      <h1>
        <router-link to="/">Find your own Spiritual Guru</router-link>
      </h1>
      <ul>
        <li class=""><router-link to="/guru">All guru</router-link></li>
        <li class="" v-if="isLoggedIn">
          <router-link class="requests-link" to="/requests"
            >Requests
            <span class="requests-counter">{{ reqCount }}</span></router-link
          >
        </li>
        <li v-else>
          <router-link to="/auth">Login</router-link>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout">Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
export default {
  data () {
    return {
      reqCount: 0
    }
  },
  computed: {
    isLoggedIn () {
      const auth = this.$store.getters.isAuthenticated
      if (auth) {
        this.requestCounter()
        return auth
      } else {
        return auth
      }
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.replace('/guru')
    },
    requestCounter () {
      setInterval(
        async function () {
          try {
            await this.$store.dispatch('requests/fetchRequestsQnty')
          } catch {
            console.log('error')
          }

          this.reqCount = this.$store.getters['requests/requestCount']
        }.bind(this),
        5000
      )
    }
  }
}
</script>
<style lang="scss">
header {
  width: 100%;
  height: 5rem;
  background-color: #86aadc;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: black;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid rgba(255, 188, 51, 1);
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}

.requests-counter {
  color: gold;
}
</style>
