<template>
  <nav>
    <router-link to="/">Home</router-link>|
    <router-link to="/login">Login</router-link>|
    <router-link to="/register">Register</router-link>
    <button @click="handleSignOut" v-if="isLoggedIn">Sair da conta</button>
  </nav>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import router from './router';

export default defineComponent({
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
      auth: getAuth()
    }
  },
  methods: {
    handleSignOut() {
      signOut(this.auth).then(() => {
        router.push('/')
      })
    }
  },
  mounted() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }
});
</script>

<style>

</style>
