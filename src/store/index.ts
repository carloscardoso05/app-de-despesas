import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { db } from "@/main";
import { collection } from "firebase/firestore";

import { getAuth } from "firebase/auth";
const userId = getAuth().currentUser?.uid as string
// const userId = "user1"

export const useDespesasStore = defineStore("DespesasStore", () => {
  const userData = ref()
  const userCollection = computed(() => collection(db, currentUid.value))

  const currentUid = ref(userId);
  const yearSelect = ref("");
  const monthSelect = ref("");

  return {
    yearSelect,
    monthSelect,
    currentUid,
    userData,
    userCollection
  };
});
