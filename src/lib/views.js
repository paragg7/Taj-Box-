import { db } from "./firebase";
import { doc, getDoc, setDoc, increment } from "firebase/firestore";

export async function bumpView(pageKey) {
  const ref = doc(db, "pageViews", pageKey);

  await setDoc(ref, { count: increment(1) }, { merge: true });

  const snap = await getDoc(ref);
  return snap.exists() ? snap.data().count ?? 0 : 0;
}