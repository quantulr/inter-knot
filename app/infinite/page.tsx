"use client";

import { useRef, useState } from "react";
import useInfiniteScroll from "@/app/_hooks/useInfiniteScroll";
import { useVirtualizer } from "@tanstack/react-virtual";

const Page = () => {
  const [data, setData] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement>(null);
  const fetcher = async (page: number, limit: number) => {
    const getNumberArray = (): Promise<number[]> =>
      new Promise((resolve) => {
        setTimeout(() => {
          const start = (page - 1) * limit + 1;
          const end = page * limit;
          const numbers: number[] = [];

          for (let i = start; i <= end; i++) {
            numbers.push(i);
          }
          resolve(numbers);
        }, 500);
      });
    return await getNumberArray();
  };

  useInfiniteScroll({
    target: loaderRef,
    size: page,
    handleObserver: async () => {
      const arr = await fetcher(page, 10);
      setData((state) => [...state, ...arr]);
      setPage((state) => state + 1);
    },
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: data.length,
    estimateSize: () => 88,
    gap: 8,
    getScrollElement: () => scrollRef.current,
  });
  return (
    <div className={"h-dvh overflow-y-auto"} ref={scrollRef}>
      <ul
        className={"relative mx-4 flex flex-col gap-2"}
        style={{
          height: `${virtualizer.getTotalSize()}px`,
        }}
      >
        {virtualizer.getVirtualItems().map((virtual) => (
          <li
            className={
              "absolute top-0 left-0 w-full rounded-lg bg-blue-300 p-8"
            }
            key={data[virtual.index]}
            style={{
              transform: `translateY(${virtual.start}px)`,
            }}
          >
            {data[virtual.index]}
          </li>
        ))}
      </ul>
      <div ref={loaderRef} className={"text-center"}>
        加载更多
      </div>
    </div>
  );
};

export default Page;
