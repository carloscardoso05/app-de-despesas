<template>
  <div class="btn-group" role="group">
    <div v-for="year in yearsList" :key="year">
      <input
        type="radio"
        class="btn-check"
        name="year-option"
        :id="year"
        autocomplete="off"
        checked
        @click="setYear(year)"
      />
      <label class="btn btn-outline-primary" :for="year">
        {{ year }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from "@vue/reactivity";
import { defineComponent, ref, onMounted } from "vue";
import {getData} from "../data/userData";
import { useDespesasStore } from "../store/index";

export default defineComponent({
  name: "YearSelection",

  setup() {
    const yearsList = ref([] as string[]);
    const store = useDespesasStore();
    const userId = computed(() => store.currentUid)
    const path = ref(`users/${userId.value}/`)

    onMounted(() => {
      getData(path.value).then((result) => {  
        for (let year in result) {
          yearsList.value.push(year);
        }
        yearsList.value.sort()
        setYear(yearsList.value[0])
        if (result == null) console.log("Não foi possível acessar os dados");
      });
    });

    const setYear = store.setYear

    return {
      yearsList,
      setYear
    };
  },
});
</script>

<style scoped></style>
