"use client";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useEffect, useRef } from "react";

const PostImagesSwiper = ({
  images,
}: {
  images: string[]; // Array of image URLs
}) => {
  const swiperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let swiper: Swiper | null = null;
    if (swiperRef.current) {
      swiper = new Swiper(swiperRef.current, {
        modules: [Navigation, Pagination],
        pagination: {
          el: ".swiper-pagination",
        },
      });
    }
    return () => {
      if (swiper) {
        swiper.destroy();
        swiper = null;
      }
    };
  }, [swiperRef]);
  return (
    <div className="swiper rounded-2xl md:h-full" ref={swiperRef}>
      <div className="swiper-wrapper items-center">
        {images.map((image) => (
          <div className={"swiper-slide"} key={image}>
            <img className="h-full w-full object-contain" src={image} />
          </div>
        ))}
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default PostImagesSwiper;
