import { db } from "./firebase";
import { doc, getDoc, setDoc, increment } from "firebase/firestore";

<<<<<<< HEAD
export async function bumpView(pageKey) {
=======
export async function incrementAndGet(pageKey) {
>>>>>>> a3faa29 (Add maze game modal UI)
  const ref = doc(db, "pageViews", pageKey);

  await setDoc(ref, { count: increment(1) }, { merge: true });

  const snap = await getDoc(ref);
  return snap.exists() ? snap.data().count ?? 0 : 0;
<<<<<<< HEAD
=======
}

export async function getCount(pageKey) {
  const ref = doc(db, "pageViews", pageKey);

  const snap = await getDoc(ref);
  return snap.exists() ? snap.data().count ?? 0 : 0;
>>>>>>> a3faa29 (Add maze game modal UI)
}