<template>
  <table class="table table-bordered table-hover container rounded">
    <thead>
      <tr>
        <th scope="col" colspan="3">
          <h4 class="text-center">Dia {{ dayTarget }}</h4>
        </th>
      </tr>
    </thead>

    <tbody v-for="data in dayData" :key="data.id">
      <tr class="day-row">
        <td>
          <p class="descricao">{{ capitalize(data.descricao) }}</p>
          <p class="valor">
            <ValueIcon :valor="data.valor" />
            {{ formatMoney(data.valor) }}
          </p>
        </td>

        <td>
          <p v-if="data.categoria">{{ capitalize(data.categoria) }}</p>
          <p v-else>Categoria: nenhuma</p>
        </td>

        <!-- <td v-if="data.variacao" class="border-end-0">
          {{ capitalize(data.variacao) }}
        </td> -->

        <td class="action-buttons border-start-0">
          <abbr title="Editar">
            <button type="button" class="btn btn-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                ></path>
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                ></path>
              </svg>
            </button>
          </abbr>

          <abbr title="Apagar">
            <button type="button" class="btn btn-danger" @click="apagar(data)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash text-white"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                ></path>
                <path
                  fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                ></path>
              </svg>
            </button>
          </abbr>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useDespesasStore } from "@/store";
import { computed } from "@vue/reactivity";
import { arrayRemove, doc, updateDoc } from "@firebase/firestore";
import { db } from "@/main";
import ValueIcon from "./ValueIcon.vue";
import { getUserData} from "../data/userData"


interface dayInfo {
  id: number;
  valor: number;
  descricao: string;
  categoria?: string;
}

export default defineComponent({
  name: "dayInfo",
  props: {
    dayTarget: {
      required: true,
      type: String,
    },
  },
  components: { ValueIcon },

  setup(props) {
    const store = useDespesasStore();
    const yearSelect = computed(() => store.yearSelect);
    const monthSelect = computed(() => store.monthSelect);
    const userId = computed(() => store.currentUid);
    const dayData = ref([] as dayInfo[]);
    const dataPath = computed(
      () => store.userData[store.yearSelect][store.monthSelect][props.dayTarget]
    );
    const uid = computed(() => store.currentUid)

    onMounted(() => {
      for (let data in dataPath.value) {
        dayData.value.push(dataPath.value[data]);
      }
    });

    function capitalize(text: string) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    }

    function formatMoney(number: number) {
      let formated = number.toString().replace(".", ",");
      if (formated.includes("-") || formated.includes("+")) {
        formated = "R$ " + formated.slice(1);
      } else {
        formated = "R$ " + formated;
      }
      return formated;
    }

    async function apagar(data: object) {
      const docRef = doc(db, "users", userId.value);
      
      const deleteObject = computed(() => {
        return {
          [`${yearSelect.value}.${monthSelect.value}.${props.dayTarget}`]: arrayRemove(data),
        };
      });

      await updateDoc(docRef, deleteObject.value);

      getUserData(uid.value).then((result) => store.userData = result).catch((e) => console.log(e)) 

      console.log("Apagado com sucesso");
    }

    return {
      dayData,
      formatMoney,
      capitalize,
      apagar
    };
  },
});
</script>

<style scoped>
.descricao {
  font-size: large;
  font-weight: 500;
}

.action-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.day-row {
  display: grid;
  grid-template-columns: 3fr 3fr 1fr;
}
</style>
