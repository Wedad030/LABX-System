// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc } 
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Your Firebase configuration (من Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyA8ZPBzC0VdOjdr27snaoj0f2c3sLPGnbr0",
  authDomain: "labx-system.firebaseapp.com",
  projectId: "labx-system",
  storageBucket: "labx-system.firebasestorage.app",
  messagingSenderId: "177741339874",
  appId: "1:177741339874:web:d8bf24d18821f184a0015c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// إضافة حالة جديدة للسحابة
export async function saveCaseToCloud(caseData) {
  try {
    await addDoc(collection(db, "cases"), caseData);
    console.log("✨ تم حفظ الحالة في Firebase");
  } catch (error) {
    console.error("❌ خطأ في حفظ الحالة:", error);
  }
}

// جلب كل الحالات (يستخدم لاحقاً في لوحة الفني + الأرشيف)
export async function getAllCases() {
  const snapshot = await getDocs(collection(db, "cases"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// تحديث حالة معينة
export async function updateCase(id, updateData) {
  const caseRef = doc(db, "cases", id);
  await updateDoc(caseRef, updateData);
}
