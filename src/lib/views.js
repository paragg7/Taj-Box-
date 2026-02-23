import { db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

/**
 * Read-only: get current count.
 */
export async function getCount(pageKey) {
  if (!pageKey) return 0;

  const ref = doc(db, "pageViews", pageKey);
  const snap = await getDoc(ref);

  if (!snap.exists()) return 0;

  const data = snap.data();
  return typeof data?.count === "number" ? data.count : 0;
}

/**
 * Increment by +1 (create doc if missing).
 * Compatible with your Firestore rules:
 * - create allowed only when count == 1
 * - update allowed only when count == resource.count + 1
 */
export async function incrementAndGet(pageKey) {
  if (!pageKey) return 0;

  const ref = doc(db, "pageViews", pageKey);
  const snap = await getDoc(ref);

  // If doc doesn't exist -> create with count: 1
  if (!snap.exists()) {
    await setDoc(ref, { count: 1 });
    return 1;
  }

  const current = snap.data()?.count;
  const currentNum = typeof current === "number" ? current : 0;

  // Update with exact new value (rules require +1)
  const next = currentNum + 1;
  await updateDoc(ref, { count: next });

  return next;
}