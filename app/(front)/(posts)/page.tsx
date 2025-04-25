import PostsMasonryGrid from "@/app/_components/PostsMasonryGrid";

export default function Page() {
  return (
    <div
      className={
        "masonry-grid flex min-h-[calc(100dvh_-_72px)] justify-center bg-[#2a2a2a] md:min-h-[calc(100vh_-_72px)]"
      }
    >
      <PostsMasonryGrid />
    </div>
  );
}
