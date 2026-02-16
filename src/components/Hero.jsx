import React, { useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";

const Hero = () => {
  const images = useMemo(
    () => [
      {
        src: "https://images.unsplash.com/photo-1704118548916-1370403fb1e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fGJveCUyMHBhY2thZ2luZ3xlbnwwfHwwfHx8MA%3D%3D",
        alt: "Hero 1",
      },
      {
        src: "https://images.unsplash.com/photo-1704118549325-81cad2f39ab7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fGJveCUyMHBhY2thZ2luZ3xlbnwwfHwwfHx8MA%3D%3D",
        alt: "Hero 2",
      },
      {
        src: "https://images.unsplash.com/photo-1759563874833-d8f97cef9d32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGJveCUyMHBhY2thZ2luZ3xlbnwwfHwwfHx8MA%3D%3D",
        alt: "Hero 3",
      },
      {
        src: "https://images.unsplash.com/photo-1704118549271-64c0a2941803?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGJveCUyMHBhY2thZ2luZ3xlbnwwfHwwfHx8MA%3D%3D",
        alt: "Hero 4",
      },
      {
        src: "https://images.unsplash.com/photo-1633174524827-db00a6b7bc74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGJveCUyMHBhY2thZ2luZ3xlbnwwfHwwfHx8MA%3D%3D",
        alt: "Hero 5",
      },
      {
        src: "https://images.unsplash.com/photo-1704118548781-43f5987e2300?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fGJveCUyMHBhY2thZ2luZ3xlbnwwfHwwfHx8MA%3D%3D",
        alt: "Hero 6",
      },
    ],
    []
  );

  const left = images[0];
  const rightSlides = images.slice(1);

  const [swiperRef, setSwiperRef] = useState(null);

  const css = `
    .hero-right-carousel { width: 100%; height: 100%; }
    .hero-right-carousel img { width: 100%; height: 100%; object-fit: cover; }
  `;

  return (
    <section className="w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ✅ changed md:grid-cols-2 -> lg:grid-cols-2 */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* LEFT PANEL (lg+) */}
          {/* ✅ changed hidden md:block -> hidden lg:block */}
          <div className="hidden lg:block relative overflow-hidden bg-white border border-black/10">
            <img
              src={left.src}
              alt={left.alt}
              className="h-[520px] sm:h-[620px] md:h-[680px] w-full object-cover"
              draggable={false}
              loading="eager"
            />

            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

              <div className="absolute left-6 sm:left-8 top-1/2 -translate-y-1/2">
                <h2 className="text-white leading-[1.05]">
                  <span className="block text-4xl sm:text-5xl md:text-[56px] font-light">
                    Nurturing Beauty
                  </span>
                  <span className="block text-4xl sm:text-5xl md:text-[56px] font-light italic">
                    with Nature&apos;s Touch
                  </span>
                </h2>
              </div>

              <div className="absolute left-6 sm:left-8 right-6 sm:right-10 bottom-6">
                <div className="bg-black/35 border border-white/20 px-5 py-4 sm:px-6 sm:py-5">
                  <p className="text-white/85 text-[11px] sm:text-xs leading-relaxed">
                    Creating radiant skin with 100% natural, sustainably sourced
                    ingredients, while protecting the planet; we believe beauty
                    should be kind to both you and the earth.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="relative overflow-hidden bg-white border border-black/10 min-h-[520px] sm:min-h-[620px] md:min-h-[680px]">
            <style>{css}</style>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 pointer-events-none"
              onMouseEnter={() => swiperRef?.autoplay?.stop?.()}
              onMouseLeave={() => swiperRef?.autoplay?.start?.()}
            >
              <Swiper
                className="hero-right-carousel"
                modules={[Autoplay, A11y]}
                onSwiper={setSwiperRef}
                slidesPerView={1}
                loop
                speed={700}
                watchOverflow
                autoplay={{
                  delay: 2800,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                style={{ width: "100%", height: "100%", overflow: "hidden" }}
              >
                {rightSlides.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      draggable={false}
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>

            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

            <div className="absolute left-1/2 -translate-x-1/2 top-6 sm:left-6 sm:translate-x-0 sm:top-6 z-20 w-[92%] max-w-[420px]">
              <div className="bg-black/35 border border-white/20 p-5 sm:p-6 text-center sm:text-left">
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/70">
                  New Arrival
                </div>

                <h3 className="mt-2 text-white text-xl sm:text-2xl font-light italic tracking-wide">
                  Nourishing Soap
                </h3>

                <p className="mt-3 text-white/85 text-[12px] sm:text-sm leading-relaxed">
                  Gently cleanses and hydrates, leaving your skin soft,
                  refreshed, and balanced with every wash. Perfect for daily use
                  on all skin types.
                </p>

                <Link
                  to="/categories"
                  className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/80 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  Explore categories <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 px-3 flex items-center justify-between">
              <button
                type="button"
                className="h-11 w-11 border border-white/25 bg-black/25 text-white grid place-items-center hover:bg-white hover:text-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                aria-label="Previous slide"
                onClick={() => swiperRef?.slidePrev?.()}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                className="h-11 w-11 border border-white/25 bg-black/25 text-white grid place-items-center hover:bg-white hover:text-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                aria-label="Next slide"
                onClick={() => swiperRef?.slideNext?.()}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute right-4 bottom-4 z-20">
              <Link
                to="/shop"
                className="flex items-center gap-3 bg-black/35 border border-white/20 text-white uppercase tracking-widest text-[11px] sm:text-xs px-5 py-3 hover:bg-white hover:text-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Shop Now
                <span className="h-6 w-6 grid place-items-center">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
