<template>
  <button class="btn btn-primary">
    <router-link to="/add" class="text-white"
      >Adicionar gasto/ganho</router-link
    >
  </button>

  <h1>Home</h1>

  <YearSelection />
  <br />
  <MonthSelection />

  <BudgetTable />
</template>

<script lang="ts">
import YearSelection from "@/components/YearSelection.vue";
import MonthSelection from "@/components/MonthSelection.vue";
import BudgetTable from "@/components/BudgetTable.vue";
import { defineComponent, onMounted, computed } from "vue";

import { useDespesasStore } from "../store/index";
import { getUserData} from "../data/userData"

export default defineComponent({
  name: "HomeView",
  components: { YearSelection, MonthSelection, BudgetTable },
  setup() {
    const store = useDespesasStore();
    const uid = computed(() => store.currentUid)
    onMounted(async () => {
      getUserData(uid.value).then((result) => store.userData = result).catch((e) => console.log(e)) 
    });
  },
});
</script>

<style></style>
