import React, { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";

const Hero = () => {
  const images = useMemo(
    () => [
      {
        src: "/44.png",
        alt: "Luxury packaging showcase 1",
      },
      {
        src: "/42.jpg",
        alt: "Luxury packaging showcase 2",
      },
      {
        src: "/43.png",
        alt: "Luxury packaging showcase 3",
      },
      {
        src: "/41.jpg",
        alt: "Luxury packaging showcase 4",
      },
      {
        src: "/45.jpg",
        alt: "Luxury packaging showcase 5",
      },
      {
        src: "/46.png",
        alt: "Luxury packaging showcase 6",
      },
    ],
    [],
  );

  const [swiperRef, setSwiperRef] = useState(null);
  const [activeIndex, setActiveIndex] = useState(1);

  const stopAuto = () => swiperRef?.autoplay?.stop?.();
  const startAuto = () => swiperRef?.autoplay?.start?.();

  return (
    <section className="w-full">
      <div className="mx-auto max-w-[1920px] px-4 pt-6 sm:px-6 sm:pt-8 lg:px-6 lg:pt-6">
        {/* TOP EDITORIAL BANNER */}
        <div className="mb-4 hidden sm:block w-full ">
          <div className="flex flex-col gap-6 px-4 py-7 sm:px-6 md:flex-row md:items-start md:justify-between md:px-8 md:py-10">
            {/* LEFT TITLE */}
            <div className="w-full md:max-w-[60%]">
              <h1 className="text-[#1E2220] text-[30px] sm:text-[38px] md:text-[40px] lg:text-[56px] leading-[1.02] font-semibold tracking-[-0.04em]">
                STEP INTO THE FUTURE
                <br />
                OF LUXURY PACKAGING
              </h1>
            </div>

            {/* RIGHT CONTENT */}
            <div className="w-full md:max-w-[420px]">
              <p className="text-[#1E2220]/70 text-[12px] md:text-[13px] leading-relaxed uppercase tracking-[0.14em]">
                Discover timeless packaging for invitations, hampers and luxury
                gifting — crafted to elevate every moment.
              </p>

              <div className="mt-5 flex flex-col gap-2 md:flex-row">
                <Link
                  to="/shop"
                  className="inline-flex w-full items-center justify-center gap-3 border border-[#1E2220] bg-[#1E2220] px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-[#FAF9F6] transition hover:bg-[#FAF9F6] hover:text-[#1E2220]"
                >
                  New Arrivals
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/categories"
                  className="inline-flex w-full items-center justify-center gap-3 border border-[#1E2220] px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-[#1E2220] transition hover:bg-[#1E2220] hover:text-[#FAF9F6]"
                >
                  Categories
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CONNECTED IMAGE SECTION */}
        <div
          className="group relative overflow-hidden border border-[#1E2220]/10 bg-[#EAE8E2]"
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
        >
          <div className="relative h-[520px] sm:h-[600px] lg:h-[720px]">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Swiper
                modules={[Autoplay, A11y]}
                onSwiper={setSwiperRef}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex + 1)}
                slidesPerView={1}
                loop
                speed={800}
                watchOverflow
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                className="h-full w-full"
              >
                {images.map((img, index) => (
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

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-black/10 to-transparent" />

            {/* top labels */}
            <div className="absolute left-4 right-4 top-4 z-20 flex items-start justify-between sm:left-6 sm:right-6 sm:top-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.26em] text-[#FAF9F6]/72">
                  TAJ BOX
                </p>
              </div>

              <div className="text-right">
                <p className=" text-[10px] uppercase tracking-[0.18em] text-[#FAF9F6]/58">
                  {String(activeIndex).padStart(2, "0")} /{" "}
                  {String(images.length).padStart(2, "0")}
                </p>
              </div>
            </div>

            {/* bottom content */}
            {/* overlay for text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E2220]/70 via-[#1E2220]/50 to-transparent z-10" />

            <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-6 lg:p-8">
              <div className="max-w-[680px]">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#FAF9F6]/80">
                  Crafted With Intention
                </p>

                <h2 className="mt-3 text-[28px] font-semibold leading-[1.02] tracking-[-0.04em] text-[#FAF9F6] sm:text-[40px] lg:text-[52px]">
                  Packaging That
                  <br />
                  Belongs to the Moment
                </h2>

                <p className="mt-4 max-w-[500px] text-[13px] leading-relaxed text-[#FAF9F6]/90 sm:text-[14px]">
                  From invitation boxes to festive gifting, Taj Box creates
                  elegant packaging that feels refined, memorable and made for
                  celebration.
                </p>

                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                  <Link
                    to="/shop"
                    className="inline-flex min-h-[48px] items-center justify-center gap-3 border border-[#FAF9F6] bg-[#FAF9F6] px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-[#1E2220] transition hover:bg-[#1E2220] hover:text-[#FAF9F6]"
                  >
                    Shop Collection
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    to="/categories"
                     className="inline-flex min-h-[48px] items-center justify-center gap-3 border border-[#FAF9F6] bg-[#FAF9F6] px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-[#1E2220] transition hover:bg-[#1E2220] hover:text-[#FAF9F6]"
                  >
                    Explore Categories
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
