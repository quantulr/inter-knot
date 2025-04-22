import Link from "next/link";

export default function Page() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
      }}
      className={"masonry-grid flex justify-center bg-[#2a2a2a]"}
    >
      <div className="h-72 w-96 text-white">
        <Link className="text-white" href={"/history/dialog"}>
          打开
        </Link>
      </div>
    </div>
  );
}
