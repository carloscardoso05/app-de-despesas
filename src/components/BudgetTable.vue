<template>
  <DayInfo v-for="day in daysList" :key="day" :dayTarget="day" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { useDespesasStore } from "@/store";
import { computed } from "@vue/reactivity";
import { getData } from "@/data/userData";
import DayInfo from "./DayInfo.vue";

export default defineComponent({
  name: "budgetTable",
  components: { DayInfo },

  setup() {
    const store = useDespesasStore();
    const datePath = computed(() => store.datePath);
    const data = ref();
    const daysList = ref([] as string[]);

    watch([datePath], () => {
      console.log(datePath.value);
      getData(datePath.value).then((result) => {
        data.value = result;
        daysList.value = [];
        for (let day in result) {
          daysList.value.push(day);
        }
        daysList.value.sort().reverse(); // retirar o .reverse() se preferir os dias mais recentes primeiro
      });
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
