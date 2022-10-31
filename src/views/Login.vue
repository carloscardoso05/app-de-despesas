<template>
  <h1>Acesse sua conta</h1>
  <p><input type="text" placeholder="Email" v-model="email"></p>
  <p><input type="password" placeholder="Senha" v-model="password"></p>
  <p v-if="errMsg">{{errMsg}}</p>
  <p><button @click="logIn">Entrar</button></p>
  <p><button @click="logInWithGoogle">Entrar com Google</button></p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'register-name',
  data() {
    return {
      email: '',
      password: '',
      router: useRouter(),
      errMsg: ''
    }
  },
  methods: {
    logIn() {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((data) => {
          console.log('Sucesso login');
          console.log(auth.currentUser);
          this.router.push('/');
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case 'auth/invalid-email':
              this.errMsg = 'Email inválido'
              break;
            case 'auth/user-not-found':
              this.errMsg = 'Nenhuma conta com esse email foi encontrada'
              break;
            case 'auth/wrong-password':
              this.errMsg = 'Senha incorreta'
              break;
            default:
              this.errMsg = 'Email ou senha incorretos'
              break;
          }
        });
    },
    logInWithGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          console.log(result.user.email);
          this.router.push('/');
        })
        .catch((error) => {
          console.log(error.message);
        })
    }

  }
})
</script>

<style>

</style>