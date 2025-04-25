import PostDetail from "@/app/_components/PostDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div
      style={{
        minHeight: "calc(100vh - 72px)",
      }}
      className={"masonry-grid flex justify-center bg-[#2a2a2a]"}
    >
      <PostDetail id={id} />
    </div>
  );
}
