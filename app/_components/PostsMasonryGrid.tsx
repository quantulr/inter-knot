"use client";

import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { MasonryProps } from "masonic";
import useSWR from "swr";
import request from "@/app/_lib/request";

const Masonry: ComponentType<MasonryProps<Post>> = dynamic(
  () => import("masonic").then((mod) => mod.Masonry),
  {
    ssr: false,
  },
);

const PostsMasonryGrid = () => {
  const { data, isLoading } = useSWR(
    () => 1,
    (key) =>
      request.get<never, BasePageResponse<Post[]>>(
        `/posts?page=${key}&limit=10`,
      ),
  );
  const isXl = useMediaQuery({
    minWidth: 1280,
  });
  const isMd = useMediaQuery({ minWidth: 768 });
  if (isLoading) {
    return <div>loading</div>;
  }
  return (
    <div className={"w-full px-2 xl:px-20"}>
      <Masonry
        items={data!.data}
        render={MasonryCard}
        columnCount={isXl ? 5 : isMd ? 3 : 2}
      />
    </div>
  );
};

const MasonryCard = ({
  data,
}: {
  index: number;
  data: Post;
  width: number;
}) => {
  return (
    <div
      className={
        "m-2 flex min-h-[100px] flex-col overflow-hidden rounded-t-3xl rounded-bl-3xl border-4 border-black bg-white"
      }
    >
      {/*<div>Index: {index}</div>*/}
      <img className={"block"} src={data.images[0]} alt={""} />
    </div>
  );
};

export default PostsMasonryGrid;
