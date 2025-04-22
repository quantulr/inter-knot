export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div className={"h-72 w-96 bg-red-400 text-white"}>post: {id}</div>;
}
