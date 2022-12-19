<template>
  <h1>Adicionar movimentação</h1>
  <form class="form container">
    <label for="date-input" class="form-label">Data</label>
    <input type="date" class="form-control" id="date-input" v-model="date" />

    <label for="valor-input" class="form-label">Valor</label>
    <input
      type="number"
      class="form-control"
      id="valor-input"
      v-model="valor"
    />

    <label for="descricao-input" class="form-label">Descrição</label>
    <input
      type="text"
      class="form-control"
      id="descricao-input"
      v-model="descricao"
    />

    <label for="categoria-input" class="form-label">Categoria</label>
    <select
      class="form-select"
      id="categoria-input"
      aria-label="Default select"
      v-model="categoria"
    >
      <option selected value="">Nenhuma</option>
      <option :value="category" v-for="category in categorys" :key="category">
        {{ category }}
      </option>
    </select>

    <br />
    <button class="btn btn-primary" type="submit" @click.prevent="add()">
      Adicionar
    </button>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useDespesasStore } from "../store/index";
import { db } from "@/main";
import { arrayUnion, updateDoc, doc } from "firebase/firestore";

export default defineComponent({
  name: "AddPage",

  setup() {
    const categorys = ref([
      "Alimentação",
      "Saúde",
      "Lazer",
      "Educação",
    ] as string[]);

    const date = ref("");
    const ano = computed(() => date.value.substring(0, 4));
    const mes = computed(() => date.value.substring(5, 7));
    const dia = computed(() => date.value.substring(8, 10));
    const valor = ref(0);
    const descricao = ref("");
    const categoria = ref("");

    const store = useDespesasStore();
    const userId = computed(() => store.currentUid);

    const dataObj = computed(() => {
      return {
        id: Date.now(),
        descricao: descricao.value,
        valor: valor.value,
        categoria: categoria.value,
      };
    });

    // const updateObject = computed(() => {
    //   return {
    //     [ano.value]: {
    //       [mes.value]: {
    //         [dia.value]: arrayUnion(dataObj.value),
    //       },
    //     },
    //   };
    // });

    const updateObject = computed(() => {
      return {
        [`${ano.value}.${mes.value}.${dia.value}`]: arrayUnion(dataObj.value),
      };
    });

    async function add() {
      const docRef = doc(db, "users", userId.value);

      console.log(`${ano.value}.${mes.value}.${dia.value}`);

      await updateDoc(docRef, updateObject.value);
      date.value = "";
      descricao.value = "";
      categoria.value = "";
      valor.value = 0;
      console.log("Adicionado com sucesso");
    }

    return {
      categorys,
      valor,
      descricao,
      categoria,
      date,
      add,
    };
  },
});
</script>

<style></style>
