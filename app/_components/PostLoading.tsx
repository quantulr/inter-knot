"use client";
import loadingImg from "@/app/_assets/loading.png";
import "./PostLoading.css";
import { useEffect, useRef } from "react";

export default function LoadingPage({
  handleObserver,
  isValidating,
  size,
}: {
  handleObserver?: () => void;
  isValidating?: boolean;
  size?: number;
}) {
  const lastItemRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>(null);
  // 设置观察者
  useEffect(() => {
    if (handleObserver) {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      };
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          handleObserver();
        }
      }, options);

      if (lastItemRef.current) {
        observer.current.observe(lastItemRef.current);
      }
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [size, isValidating]);
  return (
    <div
      ref={lastItemRef}
      className={`mx-auto mt-4 h-[60px] w-[212px] animate-[loadingLoop-zzz-a9bf7fce_.5s_steps(30)_infinite_forwards] rounded-lg bg-[#ffffff2e] ${isValidating === false ? "invisible" : ""}`}
      style={{
        backgroundImage: `url(${loadingImg.src})`,
        backgroundSize: "100% 3000%",
        backgroundPositionY: "0 0",
      }}
    ></div>
  );
}
