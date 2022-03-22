<template>
  <Toast/>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/todo">Go to app</router-link>
  </nav>
  <router-view/>
</template>

<script lang="ts">
import Toast from 'primevue/toast';
import {
  defineComponent,
} from 'vue';

export default defineComponent({
  components: {
    Toast,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
