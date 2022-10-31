<template>
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
import { defineComponent, onMounted } from "vue";
import { getAuth } from "firebase/auth";

export default defineComponent({
  name: "HomeView",
  components: { YearSelection, MonthSelection, BudgetTable},

  setup() {
    onMounted(() => {
      console.log(getAuth().currentUser?.uid);
    });
  },
});
</script>

<style></style>
