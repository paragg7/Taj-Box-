import React, { useEffect, useMemo, useState } from "react";
import {
  addDoc,
  serverTimestamp,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Quote,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth } from "@/lib/firebase";

// ✅ 2 / week key (ISO week)
const getWeekKey = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);

  // Thursday-based ISO week calculation
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));

  const week1 = new Date(d.getFullYear(), 0, 4);
  const weekNumber =
    1 +
    Math.round(
      ((d.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7,
    );

  return `${d.getFullYear()}-W${String(weekNumber).padStart(2, "0")}`;
};

const Reviews = () => {
  // ✅ seed testimonials (static)
  const seed = useMemo(
    () => [
      {
        id: "seed-1",
        quote:
          "Taj Boxes made our wedding feel truly royal. Every detail—from the texture to the finishing—looked premium and thoughtful. Guests couldn't stop talking about the invitations and the gift boxes.",
        name: "Aarav & Meera",
        city: "Delhi",
        createdAt: new Date("2025-01-01").toISOString(),
        weekKey: "2025-W01",
        uid: "seed",
      },
      {
        id: "seed-2",
        quote:
          "The craftsmanship is outstanding. The box structure is strong, the fit is perfect, and the design looks even better in real life. Communication was smooth and the delivery was exactly on time.",
        name: "Riya Sharma",
        city: "Karnal",
        createdAt: new Date("2025-01-01").toISOString(),
        weekKey: "2025-W01",
        uid: "seed",
      },
      {
        id: "seed-3",
        quote:
          "We needed premium packaging for a family function and Taj Boxes delivered beyond expectations. The detailing, neat edges, and finishing were flawless—exactly the luxury look we wanted.",
        name: "Karan Malhotra",
        city: "Ambala",
        createdAt: new Date("2025-01-01").toISOString(),
        weekKey: "2025-W01",
        uid: "seed",
      },
      {
        id: "seed-4",
        quote:
          "From consultation to final delivery, the entire experience felt professional and premium. They understood our theme instantly and executed it beautifully. It looked elegant, traditional, and modern—at the same time.",
        name: "Simran Kaur",
        city: "Chandigarh",
        createdAt: new Date("2025-01-01").toISOString(),
        weekKey: "2025-W01",
        uid: "seed",
      },
    ],
    [],
  );

  const [reviews, setReviews] = useState(seed);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [form, setForm] = useState({ name: "", city: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Firebase anonymous user id
  const [uid, setUid] = useState(null);

  // ✅ Owner (UI-only for now)
  const isAdmin = false;

  // ✅ Week key for limit check
  const weekKey = getWeekKey(new Date());

  const usedThisWeek = useMemo(() => {
  if (!uid) return 0;
  return reviews.filter(
    (r) => r.uid === uid && r.weekKey === getWeekKey(new Date()),
  ).length;
}, [reviews, uid]);

  const remaining = Math.max(0, 2 - usedThisWeek);

  const total = reviews.length;
  const active = reviews[currentIndex];

  const canScrollPrev = currentIndex > 0;
  const canScrollNext = currentIndex < total - 1;

  const handlePrev = () =>
    setCurrentIndex((p) => (p === 0 ? total - 1 : p - 1));
  const handleNext = () =>
    setCurrentIndex((p) => (p === total - 1 ? 0 : p + 1));

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  // ✅ Silent anonymous sign-in
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        await signInAnonymously(auth);
        return;
      }
      setUid(user.uid);
    });

    return () => unsub();
  }, []);

  // ✅ Realtime listener (shows for everyone)
  useEffect(() => {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snap) => {
      const live = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          uid: data.uid || "",
          quote: data.message || "",
          name: data.name || "",
          position: data.city || "",
          createdAt: data.createdAt?.toDate?.()
            ? data.createdAt.toDate().toISOString()
            : "",
          weekKey: data.weekKey || "",
        };
      });

      // ✅ Keep seed + add live reviews after seed
      setReviews((prev) => {
        const seedOnly = prev.filter((r) => String(r.id).startsWith("seed-"));
        return [...seedOnly, ...live];
      });

      setCurrentIndex(0);
    });

    return () => unsub();
  }, []);

  const goTo = (idx) => setCurrentIndex(Math.max(0, Math.min(idx, total - 1)));

  // ✅ Submit review to Firestore (limit is UI for now; real enforcement in Step 3 functions)
  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const name = form.name.trim();
    const city = form.city.trim();
    const message = form.message.trim();

    if (!name || !city || !message) return;

    if (!uid) {
      setErrorMsg("Please wait a second and try again.");
      return;
    }

    if (remaining <= 0) {
      setErrorMsg("You've reached the limit (2 reviews/week).");
      return;
    }

    try {
      await addDoc(collection(db, "reviews"), {
        uid,
        name,
        city,
        message,
        weekKey: getWeekKey(new Date()),
        createdAt: serverTimestamp(),
      });

      setForm({ name: "", city: "", message: "" });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2500);
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  // UI-only delete (real admin delete later via Cloud Functions)
  const onAdminDelete = (reviewId) => {
    if (!isAdmin) return;
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    setCurrentIndex((idx) => Math.max(0, Math.min(idx, total - 2)));
  };

  // ✅ Character counter for message
  const maxChars = 500;
  const charCount = form.message.length;

  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT */}
          <div>
            <p className="text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-black/50">
              TESTIMONIALS
            </p>

            <h2 className="mt-3 text-4xl sm:text-5xl font-semibold text-black leading-[1.05]">
              What Our Clients Are Saying
            </h2>

            <p className="mt-5 text-sm sm:text-base text-black/70 max-w-md leading-relaxed">
              We take pride in delivering exceptional solutions that deliver
              great results. But don&apos;t just take our word for it.
            </p>

            <button
              type="button"
              className="
                mt-7
                group
                relative
                text-xs xs:text-sm
                uppercase
                tracking-widest
                text-black
                transition
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-black/30
              "
            >
              View all testimonials
              <span className="block h-px bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 mt-2" />
            </button>
          </div>

          {/* RIGHT */}
          <div className="min-w-0">
            <div className="border border-black/10 p-6 sm:p-7 h-[420px] flex flex-col">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 border border-black/10 flex items-center justify-center">
                    <Quote className="h-4 w-4 text-black/60" />
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-black/50">
                    Client Words
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {reviews.map((t, idx) => {
                    const isActive = idx === currentIndex;
                    return (
                      <button
                        key={t.id}
                        onClick={() => goTo(idx)}
                        className={`h-2 w-2 border transition ${
                          isActive
                            ? "bg-black border-black"
                            : "bg-white border-black/25 hover:border-black/60"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex-1 mt-6">
                <p className="text-[20px] sm:text-[24px] leading-9 text-black">
                  &ldquo;{active?.quote}&rdquo;
                </p>
              </div>

              <div className="h-px w-full bg-black/10 my-6" />

              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="text-sm font-semibold text-black">
                    {active?.name}
                  </p>
                  <p className="mt-1 text-xs text-black/60">
                    {active?.position ?? active?.city}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {isAdmin && active?.id && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className={cn(
                        "h-10 w-10 rounded-none border-black/15 shadow-none hover:shadow-none focus:shadow-none",
                        "hover:bg-black/[0.02] transition",
                      )}
                      onClick={() => onAdminDelete(active.id)}
                      title="Delete review"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "h-10 w-10 rounded-none border-black/15 shadow-none hover:shadow-none focus:shadow-none",
                      "hover:bg-black/[0.02] transition",
                    )}
                    disabled={!canScrollPrev}
                    onClick={handlePrev}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Previous</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "h-10 w-10 rounded-none border-black/15 shadow-none hover:shadow-none focus:shadow-none",
                      "hover:bg-black/[0.02] transition",
                    )}
                    disabled={!canScrollNext}
                    onClick={handleNext}
                  >
                    <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">Next</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Review Form */}
        <div className="mt-10 border border-black/10 p-6 sm:p-7">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-black/50">
                Share your experience
              </p>
              <h3 className="mt-2 text-lg sm:text-xl font-semibold text-black">
                Submit a Review
              </h3>
              <p className="mt-2 text-sm sm:text-base text-black/70 max-w-2xl leading-relaxed">
                Your feedback helps others understand the quality and
                craftsmanship of Taj Boxes.
              </p>

              <p className="mt-3 text-xs text-black/60">
                {remaining > 0 ? (
                  <>
                    <span className="font-medium text-black">{remaining}</span>{" "}
                    submissions left this week.
                  </>
                ) : (
                  <>You've reached the limit (2 reviews/week).</>
                )}
              </p>

              {!uid && (
                <p className="mt-2 text-xs text-black/50">
                  Loading secure guest session…
                </p>
              )}
            </div>

            {submitted && (
              <div className="text-xs uppercase tracking-[0.22em] text-black/60">
                Thank you — submitted
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.22em] text-black/60 uppercase mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Your name"
                  className="w-full h-12 px-4 border border-black/15 bg-white outline-none focus:border-black transition text-sm text-black placeholder:text-black/40"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.22em] text-black/60 uppercase mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, city: e.target.value }))
                  }
                  placeholder="Your city"
                  className="w-full h-12 px-4 border border-black/15 bg-white outline-none focus:border-black transition text-sm text-black placeholder:text-black/40"
                />
              </div>
            </div>

            {/* Message with counter */}
            <div>
              <div className="flex items-end justify-between mb-2">
                <label className="block text-[11px] font-semibold tracking-[0.22em] text-black/60 uppercase">
                  Message
                </label>
                <div className="text-[11px] text-black/50">
                  {charCount}/{maxChars}
                </div>
              </div>
              <textarea
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                maxLength={maxChars}
                placeholder="Write your review..."
                rows={5}
                className="w-full px-4 py-3 border border-black/15 bg-white outline-none focus:border-black transition resize-none text-sm text-black placeholder:text-black/40"
              />
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-xs text-black/50">
                Please keep it respectful and genuine.
              </p>

              {errorMsg && <p className="text-xs text-red-600">{errorMsg}</p>}

              <Button
                type="submit"
                variant="outline"
                className={cn(
                  "h-12 px-5 border-black/15 shadow-none hover:shadow-none focus:shadow-none",
                  "hover:bg-black/[0.02] transition rounded-none text-xs uppercase tracking-[0.22em]",
                )}
                disabled={
                  !uid ||
                  !form.name.trim() ||
                  !form.city.trim() ||
                  !form.message.trim() ||
                  remaining <= 0
                }
              >
                Submit Review
                <ChevronRight className="ml-2 h-4 w-4 text-black/60" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Reviews;