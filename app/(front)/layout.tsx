import { ReactNode } from "react";
import NavBar from "@/app/_components/NavBar";
import AvatarAndLevel from "@/app/_components/AvatarAndLevel";

const Layout = ({ children }: { children: ReactNode }) => {
  // const router = useRouter()
  return (
    <div className={"h-screen bg-black"}>
      <div className={"flex h-16 items-center justify-between px-2"}>
        {/*<h2 className={"text-white text-xl font-extrabold"}>*/}
        {/*    INTER-KNOT*/}
        {/*</h2>*/}
        <div className={"left"}>
          <AvatarAndLevel />
        </div>
        <NavBar />
      </div>
      {children}
    </div>
  );
};

export default Layout;
