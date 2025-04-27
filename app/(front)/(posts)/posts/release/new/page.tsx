import PostReleaseForm from "@/app/_components/PostReleaseForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) {
    return redirect("/signin");
  }
  return (
    <div className="flex min-h-[calc(100dvh_-_72px)] flex-col px-12 py-12 md:flex-row">
      <PostReleaseForm />
    </div>
  );
}
