import { ReactNode } from "react";
import NavBar from "@/app/_components/NavBar";
import AvatarAndLevel from "@/app/_components/AvatarAndLevel";

const Layout = ({ children }: { children: ReactNode }) => {
  // const router = useRouter()
  return (
    <div className={"min-h-screen bg-black"}>
      <div
        className={
          "fixed top-0 z-20 flex h-16 w-full items-center justify-between bg-black px-2"
        }
      >
        {/*<h2 className={"text-white text-xl font-extrabold"}>*/}
        {/*    INTER-KNOT*/}
        {/*</h2>*/}
        <div className={"left"}>
          <AvatarAndLevel />
        </div>
        <NavBar />
      </div>
      <div className={"pt-20"}>{children}</div>
    </div>
  );
};

export default Layout;
