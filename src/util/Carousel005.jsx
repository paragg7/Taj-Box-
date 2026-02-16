"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Carousel005 = ({
  images,
  autoplay = true,
  showPagination = true,
  loop = true,
}) => {
  const css = `
    .carousel-005 {
      width: screen;
      height: 720px;
      padding-bottom: 40px !important;
    }

    

    .carousel-005 img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .carousel-005 .swiper-pagination-bullet {
      background-color: #000 !important;
      opacity: 0.4;
    }

    .carousel-005 .swiper-pagination-bullet-active {
      opacity: 1;
    }
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden"
    >
      <style>{css}</style>

      <Swiper
        className="carousel-005 overflow-hidden"
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        loop={loop}
        speed={800}
        watchOverflow
        style={{ width: "100%", overflow: "hidden" }}
        autoplay={
          autoplay ? { delay: 2500, disableOnInteraction: false } : false
        }
        pagination={showPagination ? { clickable: true } : false}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img.src} alt={img.alt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default Carousel005;
