<template>
  <table class="table table-bordered table-hover container rounded">
    <thead>
      <tr>
        <th scope="col" colspan="2">
          <h4 class="text-center">Dia {{ dayTarget }}</h4>
        </th>
      </tr>
    </thead>

    <tbody v-for="data in dayData" :key="data.descricao">
      <tr>
        <td>{{ capitalize(data.descricao) }}</td>

        <td v-if="data.valor > 0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus-circle-fill text-success"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
            />
          </svg>
          {{ formatMoney(data.valor) }}
        </td>

        <td v-else-if="data.valor < 0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-dash-circle-fill text-danger"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"
            />
          </svg>
          {{ formatMoney(data.valor) }}
        </td>

        <td v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-slash-circle-fill text-muted"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708l6-6z"
            />
          </svg>
          {{ formatMoney(data.valor) }}
        </td>
      </tr>
    </tbody>
  </table>
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

    function capitalize(text:string){
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
    
    function formatMoney(number: number) {
      let formated =  number.toString().replace('.', ',')
      if (formated.includes('-') || formated.includes('+')){
        formated = 'R$ ' + formated.slice(1)
      }
      else {
        formated = 'R$ ' + formated
      }
      return formated
    }

    return {
      dayData,
      formatMoney,
      capitalize
    };
  },
});
</script>

<style></style>
