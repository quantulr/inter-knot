import Link from "next/link";

export default function Page() {
  return (
    <div
      className={
        "masonry-grid flex min-h-[calc(100dvh_-_72px)] justify-center bg-[#2a2a2a] md:min-h-[calc(100vh_-_72px)]"
      }
    >
      <div className="h-72 w-96 text-white">
        <Link className="text-white" href={"/history/dialog"}>
          打开
        </Link>
      </div>
    </div>
  );
}
