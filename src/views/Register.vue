<template>
  <h1>Crie uma conta</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Senha" v-model="password" /></p>
  <p><button @click="register">Registrar</button></p>
  <p><button @click="logInWithGoogle">Criar conta com Google</button></p>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "register-name",

  setup() {
    const email = ref("");
    const password = ref();
    const router = ref(useRouter());

    function register() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
          console.log("Registro realizado com sucesso");
          router.value.push("/");
        })
        .catch((error) => {
          console.log(error.code);
          alert(error.message);
        });
    }

    function logInWithGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          console.log("Registro realizado com sucesso");
          console.log(result.user);
          router.value.push("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    return {
      register,
      logInWithGoogle,
      email,
      password,
    };
  },
});
</script>

<style></style>
