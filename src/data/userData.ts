import { ref, get, set, push, getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

export async function getData(path: string) {
  const db = getDatabase();
  const snapshot = await get(ref(db, path));
  const userData = snapshot.val();
  return userData;
}
