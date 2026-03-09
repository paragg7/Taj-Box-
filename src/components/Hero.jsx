import React, { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import Loop from "./ui/loop";

const Hero = () => {
  const images = useMemo(
    () => [
      {

        src: "/44.png",
        alt: "Hero 1",
      },
      {
        src: "/42.jpg",
        alt: "Hero 2",
      },
      {
        src: "/43.png",
        alt: "Hero 3",
      },
      {
        src: "/41.jpg",
        alt: "Hero 4",
      },
      {
        src: "/45.jpg",
        alt: "Hero 5",
      },
      {
        src: "/46.png",
        alt: "Hero 6",
      },
    ],
    [],

  );

  const left = images[0];
  const rightSlides = images.slice(1);

  const [swiperRef, setSwiperRef] = useState(null);

  const stopAuto = () => swiperRef?.autoplay?.stop?.();
  const startAuto = () => swiperRef?.autoplay?.start?.();

  return (
    <section className="w-full">
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-6 py-6 sm:py-8 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* LEFT PANEL: only desktop */}
          <div className="hidden lg:block relative overflow-hidden bg-white border border-black/10">
            <div className="relative h-[420px] sm:h-[500px] lg:h-[600px]">
              <img
                src={left.src}
                alt={left.alt}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
                loading="eager"
                fetchPriority="high"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />


              <div className="absolute left-4 sm:left-8 top-1/3 -translate-y-1/2 max-w-[520px]">
                <h2 className="text-white leading-[1.05]">
                  <span className="block text-[34px] sm:text-5xl lg:text-[56px] font-bold">
                    Packaging That Feels Like Royalty.

                  </span>
                </h2>
              </div>

              <div className="absolute left-4 right-4 sm:left-8 sm:right-10 bottom-4 sm:bottom-6">
                <div className="bg-black/35 border border-white/20 backdrop-blur-[2px] px-4 py-4 sm:px-6 sm:py-5">
                  <p className="text-white/85 text-[11px] sm:text-xs leading-relaxed">

                    Luxury packaging designed to make every moment unforgettable.

                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: always visible + taller on mobile/tablet */}
          <div
            className="relative overflow-hidden bg-white border border-black/10 group"
            onMouseEnter={stopAuto}
            onMouseLeave={startAuto}
          >
            {/* ✅ Height increased ONLY on mobile + tablet */}
            <div className="relative h-[520px] sm:h-[600px] lg:h-[600px]">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
              >
                <Swiper
                  modules={[Autoplay, A11y]}
                  onSwiper={setSwiperRef}
                  slidesPerView={1}
                  loop
                  speed={750}
                  watchOverflow
                  autoplay={{
                    delay: 2800,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  className="h-full w-full"
                >
                  {rightSlides.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img.src}
                        alt={img.alt}
                        draggable={false}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="h-full w-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />

              <div className="absolute left-1/2 -translate-x-1/2 top-4 sm:left-6 sm:translate-x-0 sm:top-6 z-20 w-[92%] max-w-[440px]">
                <div className="bg-black/35 border border-white/20 backdrop-blur-[2px] p-4 sm:p-6 text-center sm:text-left">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/70">

                    New Collection
                  </div>

                 

                  <p className="mt-3 text-white/85 text-[12px] sm:text-sm leading-relaxed">
                    Elegant invitation boxes designed to impress your guests
                    from the very first moment. Crafted with premium materials
                    and timeless detailing.

                  </p>

                  <Link
                    to="/categories"
                    className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/80 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    Explore categories <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="absolute left-4 right-4 sm:right-6 sm:left-auto bottom-4 sm:bottom-6 z-20">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-3 bg-black/35 border border-white/20 backdrop-blur-[2px]
                             text-white uppercase tracking-widest text-[11px] sm:text-xs px-5 py-3
                             hover:bg-white hover:text-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
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
      </div>

      <Loop />

    </section>
  );
};

export default Hero;
