<template>
  <h1>Acesse sua conta</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Senha" v-model="password" /></p>
  <p v-if="errMsg">{{ errMsg }}</p>
  <p><button @click="logIn">Entrar</button></p>
  <p><button @click="logInWithGoogle">Entrar com Google</button></p>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useDespesasStore } from "../store/index";
import { getUserData} from "../data/userData"


export default defineComponent({
  name: "register-name",

  setup() {
    const email = ref("");
    const password = ref("");
    const router = ref(useRouter());
    const errMsg = ref("");
    const store = useDespesasStore();
    const uid = computed(() => store.currentUid);

    function logIn() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
          console.log("Login realizado com sucesso");
          getUserData(uid.value).then((result) => store.userData = result).catch((e) => console.log(e)) 
          store.currentUid = auth.currentUser?.uid as string
          router.value.push("/");
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-email":
              errMsg.value = "Email inválido";
              break;
            case "auth/user-not-found":
              errMsg.value = "Nenhuma conta com esse email foi encontrada";
              break;
            case "auth/wrong-password":
              errMsg.value = "Senha incorreta";
              break;
            default:
              errMsg.value = "Email ou senha incorretos";
              break;
          }
        });
    }

    function logInWithGoogle() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          console.log("Login realizado com sucesso");
          console.log("Current User:", result.user.uid);

          getUserData(uid.value).then((result) => store.userData = result).catch((e) => console.log(e)) 
          store.currentUid = auth.currentUser?.uid as string
          router.value.push("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    return {
      logIn,
      logInWithGoogle,
      errMsg,
      password,
      email,
    };
  },
});
</script>

<style></style>
