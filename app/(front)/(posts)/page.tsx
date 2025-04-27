import PostsMasonryGrid from "@/app/_components/PostsMasonryGrid";
import pcPageBg from "@/app/_assets/pc-page-bg.png";

export default function Page() {
  return (
    <div
      className={
        "masonry-grid flex min-h-[calc(100dvh_-_72px)] justify-center bg-[#2a2a2a] bg-cover bg-top md:min-h-[calc(100vh_-_72px)]"
      }
      style={{
        backgroundImage: `url(${pcPageBg.src})`,
      }}
    >
      <PostsMasonryGrid />
    </div>
  );
}
