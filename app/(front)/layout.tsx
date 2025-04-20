import { ReactNode } from "react";
import NavBar from "@/app/_components/NavBar";
import AvatarAndLevel from "@/app/_components/AvatarAndLevel";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={"relative min-h-screen bg-black"}
      /*    style={{
            minHeight: "calc(100vh - 64px)",
          }}*/
    >
      <div
        className={
          "fixed top-0 left-0 z-20 flex h-16 w-full items-center justify-between bg-black px-2"
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
      {/*<div className={"h-16"}></div>*/}
      <div className={"pt-16"}>{children}</div>
    </div>
  );
};

export default Layout;
