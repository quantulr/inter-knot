"use client";

import { Masonry } from "masonic";
import { useMediaQuery } from "react-responsive";

let i = 0;
const items = Array.from(Array(200), () => ({ id: i++ }));

const PostsMasonryGrid = () => {
  const isXl = useMediaQuery({
    minWidth: 1280,
  });
  const isMd = useMediaQuery({ minWidth: 768 });
  return (
    <div className={"min-h-screen w-full px-2 xl:px-20"}>
      <Masonry
        items={items}
        render={MasonryCard}
        columnCount={isXl ? 5 : isMd ? 3 : 2}
      />
    </div>
  );
};

const MasonryCard = ({}: {
  index: number;
  data: {
    id: number;
  };
  width: number;
}) => {
  /*  const { data } = useSWR(
      () => Math.floor(Math.random() * (500 - 400 + 1)) + 400,
      (key) => request.get<never, Blob>(`https://picsum.photos/300/${key}.webp`),
    );*/
  const height = Math.floor(Math.random() * (500 - 400 + 1)) + 400;
  return (
    <div
      className={
        "m-2 flex min-h-[100px] flex-col overflow-hidden rounded-t-3xl rounded-bl-3xl border-4 border-black bg-white"
      }
    >
      {/*<div>Index: {index}</div>*/}
      <img
        className={"block"}
        src={`https://picsum.photos/300/${height}.webp`}
      />
    </div>
  );
};

export default PostsMasonryGrid;
