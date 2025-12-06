// -------------------------------------------------------
//  Firebase SDK Import
// -------------------------------------------------------
import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

import { 
  getFirestore, collection, addDoc, getDocs, doc, getDoc, setDoc, deleteDoc, query, orderBy 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";


// -------------------------------------------------------
//  Firebase Configuration
// -------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyA8PZBCV0djdr27Snaoj0FzC3sLPGn0bro",
  authDomain: "labx-system.firebaseapp.com",
  projectId: "labx-system",
  storageBucket: "labx-system.firebasestorage.app",
  messagingSenderId: "177741339874",
  appId: "1:177741339874:web:d8bf24d18821f84a0015c9"
};


// -------------------------------------------------------
//  Initialize Firebase + Firestore
// -------------------------------------------------------
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);



// -------------------------------------------------------
//  🔥 حفظ حالة جديدة في Firebase
// -------------------------------------------------------
export async function saveCaseToCloud(caseData) {
  try {
    await addDoc(collection(db, "cases"), caseData);
    console.log("✅ تم حفظ الحالة في Firebase");
  } catch (error) {
    console.error("❌ خطأ عند حفظ الحالة:", error);
  }
}



// -------------------------------------------------------
//  🔥 جلب كل الحالات (جديدة + غير منقولة)
// -------------------------------------------------------
export async function getAllCases() {
  const snapshot = await getDocs(collection(db, "cases"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}



// -------------------------------------------------------
//  🔥 نقل حالة إلى الحالات الجاهزة
// -------------------------------------------------------
export async function moveToReadyCases(id) {
  const srcRef = doc(db, "cases", id);
  const destRef = doc(db, "readyCases", id);

  const snap = await getDoc(srcRef);

  if (snap.exists()) {
    await setDoc(destRef, {
      ...snap.data(),
      status: "جاهزة",
      readyAt: Date.now()
    });

    await deleteDoc(srcRef); // حذف من "cases"
    console.log("🔄 تم نقل الحالة إلى الجاهزة");
  }
}



// -------------------------------------------------------
//  🔥 جلب الحالات الجاهزة مرتبة بالأحدث
// -------------------------------------------------------
export async function getReadyCases() {
  const q = query(collection(db, "readyCases"), orderBy("readyAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
