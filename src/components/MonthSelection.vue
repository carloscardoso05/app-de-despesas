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
import { defineComponent, ref, onMounted, watch } from "vue";
import {getData, userId} from "../data/userData";
import { useDespesasStore } from "../store/index";

export default defineComponent({
  name: "monthSelection",

  setup() {
    const store = useDespesasStore();
    const yearSelect = computed(() => store.yearSelect);
    const monthsList = ref([] as string[]);
    const path = computed(() => `users/${userId}/${yearSelect.value}/`)
    const setMonth = store.setMonth
    
    watch([yearSelect], () => {
      getData(path.value).then((result) => {
        monthsList.value = []
        for (let month in result) {
          monthsList.value.push(month);
        }
        monthsList.value.sort()
        setMonth(monthsList.value[0])
      });
    });


    return {
      monthsList,
      setMonth
    };
  },
});
</script>

<style scoped></style>
