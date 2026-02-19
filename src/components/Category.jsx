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

const Category = () => {
  const items = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=600&auto=format&fit=crop&q=60",
      name: "MDF BOX",
      link: "/shop/mdf-box",
      desc: "Rigid luxury boxes with premium finishing options.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1728034261578-afe827e282a2?w=600&auto=format&fit=crop&q=60",
      name: "FILE BOX",
      link: "/shop/file-box",
      desc: "Structured packaging designed for elegance and order.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1700107650924-d42d35552841?w=600&auto=format&fit=crop&q=60",
      name: "DHOLLU",
      link: "/shop/dhollu",
      desc: "Classic styles with traditional wedding presentation.",
    },{
      id: 4,
      image:
        "https://images.unsplash.com/photo-1700107650924-d42d35552841?w=600&auto=format&fit=crop&q=60",
      name: "CAKE BOX",
       link: "/shop/cake-box",
      desc: "Classic styles with traditional wedding presentation.",
    },{
      id: 5,
      image:
        "https://images.unsplash.com/photo-1700107650924-d42d35552841?w=600&auto=format&fit=crop&q=60",
      name: "PLATTER BOX",
      link: "/shop/platter-box",
      desc: "Classic styles with traditional wedding presentation.",
    },{
      id: 6,
      image:
        "https://images.unsplash.com/photo-1700107650924-d42d35552841?w=600&auto=format&fit=crop&q=60",
      name: "SWEETS BOX",
      link: "/shop/sweets-box",
      desc: "Classic styles with traditional wedding presentation.",
    },{
      id: 7,
      image:
        "https://images.unsplash.com/photo-1700107650924-d42d35552841?w=600&auto=format&fit=crop&q=60",
      name: "HAMPER BOX",
      link: "/shop/hamper-box",
      desc: "Classic styles with traditional wedding presentation.",
    },
  ];

  return (
    <section className="py-12 md:py-8">
      <Title heading="Browse by categories" link="/categories" />

      {/* keep your spacing */}
      <div className="mt-3 px-4 sm:px-6 lg:px-8">
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
              {items.map((item) => (
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
                    className="block outline-none"
                    aria-label={`Go to ${item.name}`}
                  >
                    {/* ✅ Fixed-height premium card */}
                    <div
                      className="
                        group h-[360px] sm:h-[380px]
                        border border-black/10 bg-white
                        hover:border-black/25
                        transition-colors duration-300
                        flex flex-col
                      "
                    >
                      {/* Image */}
                      <div className="relative h-[55%] overflow-hidden border-b border-black/10">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col justify-between flex-1 px-5 py-5">
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.22em] text-black/40">
                            Category
                          </div>

                          <h3 className="mt-2 text-sm sm:text-[15px] font-semibold text-black leading-snug">
                            {item.name}
                          </h3>

                          {/* ✅ Clamp so height never changes */}
                          <p className="mt-2 text-sm text-black/65 leading-relaxed line-clamp-2">
                            {item.desc}
                          </p>
                        </div>

                        {/* CTA stays aligned for all cards */}
                        <div className="mt-4 text-[10px] uppercase tracking-[0.22em] text-black/50">
                          Explore collection →
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* keep your old buttons placement exactly */}
            <div className="hidden md:flex absolute -bottom-4 right-0 gap-3 translate-y-full">
              <CarouselPrevious className="static translate-y-0 translate-x-0" />
              <CarouselNext className="static translate-y-0 translate-x-0" />
            </div>

            <div className="md:hidden flex justify-end gap-3 mt-4">
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
