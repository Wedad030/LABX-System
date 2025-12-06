// ==============================
// 1) Import Firebase SDK
// ==============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
    getFirestore, collection, addDoc, getDocs, updateDoc, doc 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// ==============================
// 2) Firebase Configuration
// ==============================
const firebaseConfig = {
    apiKey: "AIzaSyA8PZBCVOdQjdr27snaj0fz2c5LPGnbro",
    authDomain: "labx-system.firebaseapp.com",
    projectId: "labx-system",
    storageBucket: "labx-system.firebasestorage.app",
    messagingSenderId: "177741339874",
    appId: "1:177741339874:web:d8bf24d18821f84a0015c9"
};

// ==============================
// 3) Initialize Firebase
// ==============================
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ==============================
// 4) حفظ حالة جديدة (add-case)
// ==============================
export async function saveCaseToCloud(caseData) {
    try {
        await addDoc(collection(db, "cases"), caseData);
        console.log("✓ تم حفظ الحالة في Firebase");
    } catch (error) {
        console.error("خطأ في حفظ الحالة:", error);
    }
}

// ==============================
// 5) جلب جميع الحالات (للصفحات)
// ==============================
export async function getAllCases() {
    const snapshot = await getDocs(collection(db, "cases"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// ==============================
// 6) جلب حالة واحدة (للـ QR Details)
// ==============================
export async function getCaseById(id) {
    try {
        const snapshot = await getDocs(collection(db, "cases"));
        const found = snapshot.docs.find(doc => doc.id === id);

        return found ? { id: found.id, ...found.data() } : null;

    } catch (error) {
        console.error("خطأ في جلب الحالة:", error);
        return null;
    }
}

// ==============================
// 7) تحديث حالة فني (جاهزة Ready) 
// ==============================
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
