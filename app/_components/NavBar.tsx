"use client";

import { usePathname } from "next/navigation";

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
const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className={"rounded-full border-2 border-white"}>
      <ul className={"tabs flex text-xl font-bold text-white"}>
        {navs.map((nav) => (
          <li key={nav.href} className={"relative cursor-pointer"}>
            <div
              className={`${nav.href === pathname ? "block" : "hidden"} indicator absolute top-0 left-0 z-10 h-full w-full animate-pulse bg-[#c0c726]`}
              style={{
                borderRadius: "22px 5px 36px 22px",
                animation: "",
              }}
            ></div>
            <a className={"block px-10 py-2"} href={nav.href}>
              <span
                className={`relative z-20 ${nav.href === pathname ? "text-black" : "text-white"}`}
              >
                {nav.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
