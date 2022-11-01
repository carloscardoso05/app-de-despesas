import { ref, get, set, push, getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useDespesasStore } from "@/store";


export const userId = getAuth().currentUser?.uid

export async function getData(path: string) {
  const db = getDatabase();
  const snapshot = await get(ref(db, path));
  const userData = snapshot.val();
  return userData;
}

function newOperation(
  ano: string,
  mes: string,
  dia: string,
  descricao: string,
  valor: number
) {
  const db = getDatabase();
  const reference = ref(db, `${userId}/${ano}/${mes}/${dia}/`);
  const newRef = push(reference);
  set(newRef, {
    descricao: descricao,
    valor: valor,
  });
}