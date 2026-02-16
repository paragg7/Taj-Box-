import React from "react";
import Title from "./Title";
import Products from "./Products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

const ProductsSection = ({ products, title, link }) => {
  return (
    <section className="py-12 md:py-8">

      {/* Pass link to Title */}
      <Title heading={title} link={link} />

      <div className="mt-2 px-4 xs:px-5 md:px-8">
        <div className="relative max-w-[1800px] mx-auto">
          <Carousel
            opts={{
              align: "start",
              containScroll: "trimSnaps",
              slidesToScroll: 1,
              dragFree: false,
            }}
          >
            {/* SLIDES */}
            <CarouselContent className="-ml-4 xs:-ml-5 md:-ml-6">
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="
                    pl-4 xs:pl-5 md:pl-6
                    basis-full
                    xs:basis-1/2
                    md:basis-1/3
                    lg:basis-1/4
                    2xl:basis-1/5
                  "
                >
                  <Link to={`/product/${product.id}`} className="block">
                    <Products {...product} />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="absolute -bottom-4 right-0 flex gap-4 translate-y-full">
              <CarouselPrevious className="static translate-y-0 translate-x-0" />
              <CarouselNext className="static translate-y-0 translate-x-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;