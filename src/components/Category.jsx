import React from "react";
import Title from "./Title";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import categories from "@/products/cate";

const Category = () => {
  return (
    <section>
      <Title heading="categories" link="/categories" />

      <div className="mt-3  px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-[1800px] mx-auto">
          <Carousel
            opts={{
              align: "start",
              containScroll: "trimSnaps",
              slidesToScroll: 1,
              dragFree: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-3 sm:-ml-4 lg:-ml-5">
              {categories.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="
                    pl-3 sm:pl-4 lg:pl-5
                    basis-[85%]
                    xs:basis-1/2
                    md:basis-1/3
                    lg:basis-1/4
                    xl:basis-1/5
                    2xl:basis-1/6
                  "
                >
                  <Link
                    to={item.link}
                    className="block outline-none "
                    aria-label={`Go to ${item.name}`}
                  >
                    <div
                      className="
                        group h-[360px] sm:h-[380px]
                        border border-[#1E2220]/10 bg-[#EAE8E2]/30
                        hover:border-[#1E2220]/25 rounded-xs
                        transition-colors duration-300
                        flex flex-col
                      "
                    >
                      <div className="relative h-[65%] overflow-hidden border-b border-[#1E2220]/10">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                      </div>

                      <div className="flex flex-col justify-between flex-1 px-5 py-5">
                        <div>
                          <span className="text-[10px] uppercase tracking-[0.22em] text-[#1E2220]/40">
                            Category
                          </span>

                          <h3 className="mt-1 text-sm sm:text-[15px] font-semibold text-[#1E2220] leading-snug">
                            {item.name}
                          </h3>
                        </div>

                        <span className="text-[10px] uppercase tracking-[0.22em] text-[#1E2220]/50">
                          Explore collection →
                        </span>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="2xl:hidden flex justify-end gap-3 mt-4">
              <CarouselPrevious className="static translate-y-0 translate-x-0" />
              <CarouselNext className="static translate-y-0 translate-x-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Category;