// 1) Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } 
from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// 2) Firebase config
const firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
};

// 3) Initialize
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// 4) إضافة حالة جديدة (من add-case)
export async function saveCaseToCloud(caseData) {
    try {
        await addDoc(collection(db, "cases"), caseData);
        console.log("✓ تم حفظ الحالة في Firebase");
    } catch (error) {
        console.error("خطأ في حفظ الحالة:", error);
    }
}

// 5) جلب جميع الحالات (للصفحات)
export async function getAllCases() {
    const snapshot = await getDocs(collection(db, "cases"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// 6) ⭐⭐⭐ تحديث حالة واحدة (هنا تحطينها)
export async function updateCaseStatus(id, newStatus) {
    try {
        const caseRef = doc(collection(db, "cases"), id);
        await updateDoc(caseRef, {
            status: newStatus,
            readyTime: new Date().toLocaleString(),
        });
        console.log("✓ تم تحديث حالة الحالة في Firebase");
    } catch (error) {
        console.error("خطأ في تحديث الحالة:", error);
    }
}
