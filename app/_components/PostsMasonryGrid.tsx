"use client";

import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";
import { ComponentType, useMemo } from "react";
import { MasonryProps } from "masonic";
import useSWRInfinite from "swr/infinite";
import request from "@/app/_lib/request";
import { useRouter } from "next/navigation";
import PostLoading from "./PostLoading";
import { IoEye } from "react-icons/io5";
import HaImage from "@/app/_components/HaImage";

const Masonry: ComponentType<MasonryProps<Post>> = dynamic(
  () => import("masonic").then((mod) => mod.Masonry),
  {
    ssr: false,
  },
);

const getKey = (
  pageIndex: number,
  previousPageData: BasePageResponse<Post>,
) => {
  if (previousPageData && !previousPageData.hasNext) {
    return null;
  }
  return `/posts?page=${pageIndex + 1}&limit=10`;
};

const PostsMasonryGrid = () => {
  const {
    data: pages,
    isLoading,
    size,
    setSize,
    isValidating,
  } = useSWRInfinite(getKey, (key: string) =>
    request.get<never, BasePageResponse<Post[]>>(key),
  );

  const items = useMemo(
    () => pages?.map((page) => page.data).flat() ?? [],
    [pages],
  );

  const isXl = useMediaQuery({
    minWidth: 1280,
  });
  const isMd = useMediaQuery({ minWidth: 768 });

  if (isLoading) {
    return (
      <div className="md:[mt-30vh] mt-[30dvh]">
        <PostLoading />
      </div>
    );
  }
  return (
    <div className={"w-full px-2 md:px-20"}>
      <Masonry
        items={items}
        render={MasonryCard}
        columnCount={isXl ? 5 : isMd ? 3 : 2}
      />

      <PostLoading
        isValidating={isValidating}
        size={size}
        handleObserver={() => {
          if (isLoading || isValidating) {
            return;
          }
          const lastPage = pages ? pages[size - 1] : undefined;
          if (lastPage?.hasNext) {
            void setSize(size + 1);
          }
        }}
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
        "relative m-2 flex min-h-[100px] cursor-pointer flex-col overflow-hidden rounded-t-3xl rounded-bl-3xl border-4 border-black bg-white"
      }
    >
      <div
        className={
          "absolute top-0 left-0 flex items-center rounded-2xl p-2 text-white hover:backdrop-blur-2xl"
        }
      >
        <IoEye className="text-2xl" />
        <span className={"ml-1"}>{data.views}</span>
      </div>
      {/*<img className={"block"} src={data.images[0]} alt={""} />*/}
      <HaImage
        className={"block"}
        src={data.images[0]}
        loadingIndicator={
          <div className={"skeleton aspect-[3/4] w-full"}></div>
        }
      />
      <div className={"bg-[#272727] px-5 pb-4"}>
        <div className={"nickname-and-avatar relative flex items-center"}>
          <div className={"avatar absolute -top-7 left-0"}>
            <div className={"w-14 rounded-full border-2 border-[#272727]"}>
              <HaImage
                src={data.author.image}
                loadingIndicator={
                  <div className={"skeleton z-50 aspect-square w-full"}></div>
                }
              />
            </div>
          </div>
          <div className={"ml-16 flex w-full flex-col"}>
            <span className={"leading-none font-bold text-[#636363]"}>
              {data.author.displayUsername}
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
