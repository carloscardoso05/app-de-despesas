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
import { defineComponent, ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from "./router";

export default defineComponent({
  name: "App",

  setup() {
    const auth = ref(getAuth());
    const isLoggedIn = ref(false);
    

    function handleSignOut() {
      console.log('Usuário deslogado');
      
      signOut(auth.value).then(() => {
        router.push("/");
      });
    }

    onMounted(() => {
      onAuthStateChanged(auth.value, (user) => {
        if (user) {
          isLoggedIn.value = true;
        } else {
          isLoggedIn.value = false;
        }
      });
    });

    return {
      handleSignOut,
      isLoggedIn,
    };
  },
});
</script>

<style></style>
