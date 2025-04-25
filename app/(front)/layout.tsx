import { ReactNode } from "react";
import NavBar from "@/app/_components/NavBar";
import AvatarAndLevel from "@/app/_components/AvatarAndLevel";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={"relative min-h-screen bg-black"}>
      <div
        className={
          "fixed top-0 left-0 z-20 flex h-18 w-full items-center justify-between bg-black px-2"
        }
      >
        <div className={"left"}>
          <AvatarAndLevel />
        </div>
        <NavBar />
      </div>

      <div className={"pt-18"}>{children}</div>
    </div>
  );
};

export default Layout;
