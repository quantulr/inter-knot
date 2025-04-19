"use client";
import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import { useState } from "react";

interface PostItem {
  groupKey?: number;
  key: number;
  num: number;
}

function getItems(nextGroupKey: number, count: number) {
  const nextItems = [];
  const nextKey = nextGroupKey * count;

  for (let i = 0; i < count; ++i) {
    nextItems.push({ groupKey: nextGroupKey, key: nextKey + i });
  }
  return nextItems;
}

const Item = ({ num }: PostItem) => (
  <div
    className={"item rounded-lg bg-gray-500 text-white"}
    style={{
      width: "300px",
    }}
  >
    <div className="thumbnail">
      <img
        src={`https://naver.github.io/egjs-infinitegrid/assets/image/${(num % 33) + 1}.jpg`}
        alt="egjs"
      />
    </div>
    <div className={"info"}>{`egjs ${num}`}</div>
  </div>
);

const PostsMasonryGrid = () => {
  const [items, setItems] = useState(() => getItems(0, 10));

  return (
    <MasonryInfiniteGrid
      className="container"
      align={"center"}
      gap={8}
      onRequestAppend={(e) => {
        const nextGroupKey = (+e.groupKey! || 0) + 1;

        setItems([...items, ...getItems(nextGroupKey, 10)]);
      }}
    >
      {items.map((item) => (
        <Item
          data-grid-groupkey={item.groupKey}
          key={item.key}
          num={item.key}
        />
      ))}
    </MasonryInfiniteGrid>
  );
};

/*
const PostsMasonryGrid = () => {
  const [posts, setPosts] = useState<PostItem[]>([
    { groupKey: 0, key: 0 },
    { groupKey: 1, key: 1 },
    { groupKey: 2, key: 2 },
  ]);
  return (
    <MasonryInfiniteGrid
      align="center"
      gap={5}
      onRequestPrepend={(e) => {
        // @ts-expect-error // atdse
        const nextGroupKey = (e.groupKey || 0) + 1;
        const length = posts.length;

        setPosts([
          ...posts,
          { groupKey: nextGroupKey, key: length },
          { groupKey: nextGroupKey, key: length + 1 },
          { groupKey: nextGroupKey, key: length + 2 },
        ]);
      }}
    >
      {posts.map((post) => (
        <div
          className={"item bg-white w-[180px]"}
          data-grid-groupkey={post.groupKey}
          key={post.key}
        >
          {post.key}
        </div>
      ))}
    </MasonryInfiniteGrid>
  );
};
*/

export default PostsMasonryGrid;
