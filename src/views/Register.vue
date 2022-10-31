<template>
    <h1>Crie uma conta</h1>
    <p><input type="text" placeholder="Email" v-model="email"></p>
    <p><input type="password" placeholder="Senha" v-model="password"></p>
    <p><button @click="register">Registrar</button></p>
    <p><button @click="logInWithGoogle">Criar conta com Google</button></p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'register-name',
    data() {
        return {
            email: '',
            password: '',
            router: useRouter()
        }
    },
    methods: {
        register() {
            const auth = getAuth()
            createUserWithEmailAndPassword(auth, this.email, this.password)
                .then((data) => {
                    console.log('Sucesso registro');
                    console.log(auth.currentUser);
                    this.router.push('/');
                })
                .catch((error) => {
                    console.log(error.code);
                    alert(error.message);
                });
        },
        logInWithGoogle() {
            const provider = new GoogleAuthProvider();
            signInWithPopup(getAuth(), provider)
                .then((result) => {
                    console.log(result.user);
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