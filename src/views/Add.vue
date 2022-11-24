<template>
  <h1>Adicionar movimentação</h1>
  <form class="form container">
    <label for="date-input" class="form-label">Data</label>
    <input type="date" class="form-control" id="date-input" v-model="date" >

    <label for="valor-input" class="form-label">Valor</label>
    <input type="number" class="form-control" id="valor-input" v-model="valor" />

    <label for="descricao-input" class="form-label">Descrição</label>
    <input type="text" class="form-control" id="descricao-input" v-model="descricao" />
    
    <label for="categoria-input" class="form-label">Categoria</label>
    <select class="form-select" id="categoria-input" aria-label="Default select" v-model="categoria">
      <option selected value="">Nenhuma</option>
      <option :value="category" v-for="category in categorys" :key="category">
        {{ category }}
      </option>
    </select>

    <label for="variacao-input" class="form-label">Variação</label>
    <select class="form-select" id="variacao-input" aria-label="Default select" v-model="variacao" >
      <option selected value="">Nenhuma</option>
      <option :value="variation" v-for="variation in variations" :key="variation">
        {{ variation }}
      </option>
    </select>

    <br>
    <button class="btn btn-primary" type="submit" @click.prevent="addNewOperation()">Adicionar</button>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { ref as dBref, get, set, push, getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

export default defineComponent({
  name: "AddPage",

  setup() {
    const categorys = ref(['Alimentação','Saúde','Lazer','Educação'] as string[])
    const variations = ref(['Fixo','Variação baixa','Variação média','Variação alta'] as string[])


    const date = ref('')
    const ano = computed(() => date.value.substring(0,4))
    const mes = computed(() => date.value.substring(5,7))
    const dia = computed(() => date.value.substring(8,10))
    const valor = ref(0)
    const descricao = ref('')
    const categoria = ref('')
    const variacao = ref('')

    function addNewOperation() {
      const userId = getAuth().currentUser?.uid;
      const reference = dBref(getDatabase(), `users/${userId}/${ano.value}/${mes.value}/${dia.value}/`);
      const newRef = push(reference);
      set(newRef, {
        id: Date.now(),
        descricao: descricao.value,
        valor: valor.value,
        categoria: categoria.value,
        variacao: variacao.value, 
      });
      date.value = ''
      descricao.value = ''
      categoria.value = ''
      variacao.value = ''
      valor.value = 0
      console.log('Adicionado com sucesso');
    }

    return{
      addNewOperation,
      categorys,
      variations,
      valor,
      descricao,
      categoria,
      variacao,
      date
    }
  },
});
</script>

<style></style>
