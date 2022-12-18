<template>
  <nav class="navbar">
    <router-link class="btn btn-outline" to="/">Home</router-link>|
    <router-link class="btn btn-outline" to="/login">Login</router-link>|
    <router-link class="btn btn-outline" to="/register">Registrar</router-link>
    <button class="btn btn-outline-danger btn-logout" @click="handleSignOut" v-if="isLoggedIn">Sair da conta</button>
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
      console.log("Usuário deslogado");

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

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap");
* {
  font-family: "Rubik", sans-serif;
}
</style>

<style scoped>
.navbar {
  display: flex;
  justify-content: flex-end;
  align-items: baseline;

  background: rgba(0, 36, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 0 0 10px 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.navbar * {
  margin-inline: 1rem;
}

.btn-logout{

}
</style>
