import React, { useEffect, useMemo, useState } from "react";
import {
  addDoc,
  serverTimestamp,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { ChevronRight, ArrowLeft, ArrowRight, Quote } from "lucide-react";

import { db, auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Loop from "./ui/loop";

const getWeekKey = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
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

const seedReviews = [
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
];

const Reviews = () => {
  const [reviews, setReviews] = useState(seedReviews);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [uid, setUid] = useState(null);

  const [form, setForm] = useState({
    name: "",
    city: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const total = reviews.length;
  const active = reviews[currentIndex];
  const maxChars = 500;
  const charCount = form.message.length;

  const usedThisWeek = useMemo(() => {
    if (!uid) return 0;
    const currentWeekKey = getWeekKey(new Date());

    return reviews.filter(
      (review) => review.uid === uid && review.weekKey === currentWeekKey,
    ).length;
  }, [reviews, uid]);

  const remaining = Math.max(0, 2 - usedThisWeek);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const goTo = (index) => {
    setCurrentIndex(Math.max(0, Math.min(index, total - 1)));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        await signInAnonymously(auth);
        return;
      }
      setUid(user.uid);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const reviewsQuery = query(
      collection(db, "reviews"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(reviewsQuery, (snapshot) => {
      const liveReviews = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          uid: data.uid || "",
          quote: data.message || "",
          name: data.name || "",
          city: data.city || "",
          createdAt: data.createdAt?.toDate?.()
            ? data.createdAt.toDate().toISOString()
            : "",
          weekKey: data.weekKey || "",
        };
      });

      setReviews([...seedReviews, ...liveReviews]);
      setCurrentIndex(0);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (reviews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(interval);
  }, [reviews.length]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [total]);

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
      setTimeout(() => setSubmitted(false), 2200);
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-[#1E2220] pt-8 pb-8 px-4 sm:px-6 sm:pt-10 lg:px-8">
      <div className="mx-auto max-w-8xl">
        <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[0.9fr_1.1fr] sm:gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-[420px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#EAE8E2]/90">
              Testimonials
            </p>

            <h2 className="mt-3 text-[28px] font-semibold leading-[1.04] text-[#EAE8E2] sm:text-[30px] md:text-[30px] lg:text-[38px]">
              What Our Clients Are Saying
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-[#EAE8E2]/80 sm:text-[14px] md:text-[14px] md:leading-7 lg:text-[15px]">
              We take pride in delivering refined craftsmanship, elegant
              presentation, and memorable gifting experiences for every
              celebration.
            </p>

            
          </div>

          <div className="min-w-0">
            <div className="flex min-h-[320px] flex-col border bg-[#EAE8E2] p-4 sm:min-h-[340px] sm:p-5 md:min-h-[330px] md:p-5 lg:min-h-[390px] lg:p-6">
              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center border bg-[#1E2220] ">
                    <Quote className="h-4 w-4 text-[#EAE8E2]" />
                  </div>
                  <div className="text-[10px] uppercase tracking7-[0.22em] text-[#1E2220]/70">
                    Client words
                  </div>
                </div>

                <div className="no-scrollbar flex max-w-[45%] items-center gap-2 overflow-x-auto">
                  {reviews.map((review, index) => {
                    const isActive = index === currentIndex;

                    return (
                      <button
                        key={review.id}
                        onClick={() => goTo(index)}
                        className={cn(
                          "h-2 w-2 shrink-0 border transition",
                          isActive
                            ? "border-[#1E2220] bg-[#1E2220]"
                            : "border-[#1E2220]/20 bg[#1E2220]/30 hover:border-[#1E2220]/60",
                        )}
                        aria-label={`Go to review ${index + 1}`}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 flex-1">
                <p className="text-[17px] leading-8 text-[#1E2220] sm:text-[20px] sm:leading-8 md:text-[18px] md:leading-8 lg:text-[22px] lg:leading-9">
                  &ldquo;{active?.quote}&rdquo;
                </p>
              </div>

              <div className="my-5 h-px w-full bg-[#1E2220]/10" />

              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#1E2220]">
                    {active?.name}
                  </p>
                  <p className="mt-1 truncate text-[12px] uppercase tracking-[0.12em] text-[#1E2220]/70">
                    {active?.city}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "h-9 w-9 rounded-none border-[#1E2220]/12 shadow-none transition hover:bg-[#1E2220]/[0.02]",
                    )}
                    onClick={handlePrev}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Previous</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "h-9 w-9 rounded-none border-[#1E2220]/12 shadow-none transition hover:bg-[#1E2220]/[0.02]",
                    )}
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
{/* exper  bottom */}
        <div className="mt-8 bg-[#EAE8E2] p-5 sm:mt-10 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              

              <h3 className="mt-2 text-xl uppercase font-semibold text-[#1E2220] sm:text-[21px]">
                Share your experience
              </h3>

              <p className="mt-2 text-sm leading-7 text-[#1E2220]/60">
                Your feedback helps others understand the quality, detailing,
                and craftsmanship of Taj Boxes.
              </p>

              {/* <p className="mt-3 text-[12px] text-[#1E2220]/60">
                {remaining > 0 ? (
                  <>
                    <span className="font-medium text-[#1E2220]">{remaining}</span>{" "}
                    submissions left this week.
                  </>
                ) : (
                  <>You&apos;ve reached the limit (2 reviews/week).</>
                )}
              </p> */}

              {!uid && (
                <p className="mt-2 text-[12px] text-[#1E2220]/45">
                  Loading secure guest session…
                </p>
              )}
            </div>

            {submitted && (
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#1E2220]/55">
                Thank you — submitted
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="mt-5 grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.22em] text-[#1E2220]/80">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Your name"
                  className="h-11 w-full border border-[#1E2220]/20 bg-[#1E2220]/10 px-4 text-sm text-[#1E2220] outline-none transition placeholder:text-[#1E2220]/40 focus:border-[#1E2220]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.22em] text-[#1E2220]/80">
                  City
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, city: e.target.value }))
                  }
                  placeholder="Your city"
                  className="h-11 w-full border border-[#1E2220]/20 bg-[#1E2220]/10 px-4 text-sm text-[#1E2220] outline-none transition placeholder:text-[#1E2220]/40 focus:border-[#1E2220]"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-end justify-between">
                <label className="block text-xs font-medium uppercase tracking-[0.22em] text-[#1E2220]/80">
                  Message
                </label>
                <div className="text-[10px] text-[#1E2220]/45">
                  {charCount}/{maxChars}
                </div>
              </div>

              <textarea
                value={form.message}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, message: e.target.value }))
                }
                maxLength={maxChars}
                placeholder="Write your review..."
                rows={5}
                className="w-full resize-none border border-[#1E2220]/20 bg-[#1E2220]/10 px-4 py-3 text-sm text-[#1E2220] outline-none transition placeholder:text-[#1E2220]/40 focus:border-[#1E2220]"
              />
            </div>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[12px] text-[#1E2220]/50">
                Please keep it respectful and genuine.
              </p>

              <div className="flex flex-col items-start gap-2 sm:items-end">
                {errorMsg && (
                  <p className="text-xs text-red-600">{errorMsg}</p>
                )}

                <Button
                  type="submit"
                  variant="outline"
                  className={cn(
                    "h-11 rounded-none cursor-pointer border-[#1E2220]/20 px-5 text-[10px] uppercase tracking-[0.22em] shadow-none transition hover:bg-[#1E2220]/10",
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
                  <ChevronRight className="ml-2 h-4 w-4 text-[#1E2220]/60" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
     
    </section>
  );
};

export default Reviews;