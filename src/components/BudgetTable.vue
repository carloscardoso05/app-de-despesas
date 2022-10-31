<template>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th scope="col">Dia</th>
        <th scope="col">Descrição</th>
        <th scope="col">Valor</th>
        <th scope="col">Categoria</th>
      </tr>
    </thead>
    <tbody class="table-group-divider">
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { useDespesasStore } from "@/store";
import { computed } from "@vue/reactivity";
import { getData } from "@/data/userData";

export default defineComponent({
  name: "budgetTable",

  setup() {
    const store = useDespesasStore();
    const datePath = computed(() => store.datePath);

    watch([datePath], () => {
      console.log(datePath.value);
      getData(datePath.value).then((result) => {
        console.log(result);
      });
    });

    return {
      datePath,
    };
  },
});
</script>

<style scoped>
.table {
  width: 90vw;
  margin-inline: auto;
}
</style>
