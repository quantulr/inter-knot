import PostDetail from "@/app/_components/PostDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div
      className={
        "masonry-grid flex min-h-[calc(100dvh_-_72px)] justify-center bg-[#2a2a2a] md:min-h-[calc(100vh_-_72px)]"
      }
    >
      <PostDetail id={id} />
    </div>
  );
}
