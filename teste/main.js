import { ref, onValue, set, push } from "firebase/database";
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAgVo-p-dyS_DlvjAFamjIVrEgvesFzDSY",
  authDomain: "despesas-d008c.firebaseapp.com",
  projectId: "despesas-d008c",
  storageBucket: "despesas-d008c.appspot.com",
  messagingSenderId: "915510494352",
  appId: "1:915510494352:web:4eb51214969abf89aa4415",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const user = "carlos";

const userRef = ref(db, user + "/");
const newRef = ref(db, user + "/2025/");
let userData = {}
function setData(data){
  userData = data
}

onValue(userRef, (snapshot) => {
  const data = snapshot.val()
  console.log(snapshot.val());
  
  setData(data)
});

function newOperation (ano, mes, dia, descricao, valor) {
  const reference = ref(db, `${user}/${ano}/${mes}/${dia}/`)
  const newRef = push(reference)
  set(newRef, {
    descricao: descricao,
    valor: valor
  })
}

console.log(userData);
