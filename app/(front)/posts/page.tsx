import PostsMasonryGrid from "@/app/_components/PostsMasonryGrid";

export default function Page() {
  // const { data: posts } = useSWR("/posts", (key) =>
  //   request.get<never, Post[]>(key),
  // );
  return (
    <div className={"masonry-grid flex justify-center"}>
      <PostsMasonryGrid />
    </div>
  );
}
