import { ref, get, set, push, getDatabase } from "firebase/database";

export const userId = 'moZb4Ycs9GbhY2Zo97F0WsyFA093'

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