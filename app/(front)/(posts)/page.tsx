import PostsMasonryGrid from "@/app/_components/PostsMasonryGrid";

export default function Page() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
      }}
      className={"masonry-grid flex justify-center bg-[#2a2a2a]"}
    >
      <PostsMasonryGrid />
    </div>
  );
}
