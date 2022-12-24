<template>
  <DayInfo v-for="day in daysList" :key="day" :dayTarget="day" />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useDespesasStore } from "@/store";
import { computed } from "@vue/reactivity";
import DayInfo from "./DayInfo.vue";

export default defineComponent({
  name: "budgetTable",
  components: { DayInfo },

  setup() {
    const store = useDespesasStore();
    const monthSelect = computed(() => store.monthSelect);
    const yearSelect = computed(() => store.yearSelect);
    const userData = computed(() => store.userData);
    const dataPath = computed(
      () => store.userData[store.yearSelect][store.monthSelect]
    );
    const daysList = ref([] as string[]);

    watch([monthSelect, yearSelect, userData], () => {
      daysList.value = [];
      Object.keys(dataPath.value).forEach((day) => daysList.value.push(day))
      daysList.value.sort().reverse(); // retirar o .reverse() se preferir os dias mais antigos primeiro
    });

    return {
      daysList,
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
