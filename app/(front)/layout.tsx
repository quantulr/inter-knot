"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
// import {useRouter} from "next/router";

const navs = [
  {
    name: "推送",
    href: "/posts",
  },
  {
    name: "历程",
    href: "/history",
  },
  {
    name: "我的",
    href: "/profile",
  },
];
const Layout = ({ children }: { children: ReactNode }) => {
  // const router = useRouter()
  const pathname = usePathname();
  return (
    <div className={"h-screen bg-black"}>
      <div className={"h-16 flex justify-between items-center px-2"}>
        <h2 className={"text-white text-xl font-extrabold"}>
          INTER-KNOT “{pathname}”
        </h2>
        <nav className={"border-2 border-white rounded-full"}>
          <ul className={"tabs flex text-white font-bold text-xl"}>
            {navs.map((nav) => (
              <li
                key={nav.href}
                className={"px-10 cursor-pointer py-2 relative"}
              >
                <div
                  className={`${nav.href === pathname ? "block" : "hidden"} indicator absolute left-0 top-0 w-full h-full bg-orange-200 z-10 animate-pulse`}
                  style={{
                    borderRadius: "22px 5px 24px 22px",
                    animation: "",
                  }}
                ></div>
                <a href={nav.href}>
                  <span className={"z-20 relative text-black"}>推送</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default Layout;
