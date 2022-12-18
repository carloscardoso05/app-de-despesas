<template>
  <div class="btn-group" role="group">
    <div v-for="month in monthsList" :key="month">
      <input
        type="radio"
        class="btn-check"
        name="month-option"
        :id="month"
        autocomplete="off"
        checked
        @click="setMonth(month)"
      />
      <label class="btn btn-outline-primary" :for="month">
        {{ month }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from "@vue/reactivity";
import { defineComponent, ref, watch } from "vue";
import { useDespesasStore } from "../store/index";
import { query, where, getDocs } from "firebase/firestore";

export default defineComponent({
  name: "monthSelection",

  setup() {
    const store = useDespesasStore();
    const yearSelect = computed(() => store.yearSelect);
    const dataPath = computed(() => store.userData[store.yearSelect]);
    const monthsList = ref([] as string[]);

    watch([yearSelect], async () => {
      monthsList.value = [];
      Object.keys(dataPath.value).forEach((month) => monthsList.value.push(month))
      monthsList.value.sort();
      setMonth(monthsList.value[0]);
    });

    function setMonth(month: string): void {
      store.monthSelect = month;
    }

    return {
      monthsList,
      setMonth,
    };
  },
});
</script>

<style scoped></style>
