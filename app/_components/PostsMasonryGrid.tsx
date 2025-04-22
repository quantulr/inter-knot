"use client";

import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { MasonryProps } from "masonic";
import useSWR from "swr";
import request from "@/app/_lib/request";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/posts/${data.id}`);
      }}
      className={
        "m-2 flex min-h-[100px] cursor-pointer flex-col overflow-hidden rounded-t-3xl rounded-bl-3xl border-4 border-black bg-white"
      }
    >
      {/*<div>Index: {index}</div>*/}
      <img className={"block"} src={data.images[0]} alt={""} />
      <div className={"bg-[#272727] px-5 pb-4"}>
        <div className={"nickname-and-avatar relative flex items-center"}>
          <div className={"avatar absolute -top-7 left-0"}>
            <div className={"w-14 rounded-full border-2 border-[#272727]"}>
              <img src={data.author.avatar} />
            </div>
          </div>
          <div className={"ml-16 flex w-full flex-col"}>
            <span className={"leading-none font-bold text-[#636363]"}>
              {data.author.nickname}
            </span>
            <div
              className={"seg mt-[7] h-[3px] rounded-full bg-[#383838]"}
            ></div>
          </div>
        </div>
        <div className={"mt-4"}>
          <h3 className={"line-clamp-2 font-bold text-white"}>{data.title}</h3>
          <p
            className={
              "mt-2 truncate text-xs leading-none font-bold text-[#b1b1af]"
            }
          >
            {data.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostsMasonryGrid;
