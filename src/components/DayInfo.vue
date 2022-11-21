<template>
    <tr v-for="data in dayData" :key="data.valor">
      <th scope="row">{{dayTarget}}</th>
      <td>{{data.descricao}}</td>
      <td>{{data.valor}}</td>
      <td>Categoria</td>
      <!-- <td>
        <p>{{ data }}</p>
      </td> -->
    </tr>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { useDespesasStore } from "@/store";
import { computed } from "@vue/reactivity";
import { getData } from "@/data/userData";

interface dayInfo {
  valor: number;
  descricao: string;
}

export default defineComponent({
  name: "dayInfo",
  props: {
    dayTarget: String,
  },

  setup(props) {
    const store = useDespesasStore();
    const datePath = computed(() => store.datePath);
    const dayData = ref([] as dayInfo[]);

    onMounted(() => {
      getData(datePath.value + `${props.dayTarget}/`).then((result) => {
        for (let data in result) {
          dayData.value.push(result[data]);
        }
      });
    });

    return {
      dayData
    };
  },
});
</script>

<style></style>
