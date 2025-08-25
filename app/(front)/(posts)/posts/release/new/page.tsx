import PostReleaseForm from "@/app/_components/PostReleaseForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import pcPageBg from "@/app/_assets/pc-page-bg.png";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return redirect("/signin");
  }
  return (
    <div
      className="flex min-h-[calc(100dvh_-_72px)] flex-col bg-cover bg-top px-12 py-12 md:flex-row"
      style={{
        backgroundImage: `url(${pcPageBg.src})`,
      }}
    >
      <PostReleaseForm />
    </div>
  );
}
