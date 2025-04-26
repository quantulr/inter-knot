"use client";

import { usePathname, useRouter } from "next/navigation";

const navs = [
  {
    name: "推送",
    href: "/",
  },
  {
    name: "发布",
    href: "/posts/release",
  },
  {
    name: "我的",
    href: "/mine",
  },
];
const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <nav className={"rounded-full border-4 border-[#343434]"}>
      <ul className={"tabs flex text-white"}>
        {navs.map((nav, index) => (
          <li key={nav.href} className={"relative cursor-pointer"}>
            <div
              className={`${nav.href === pathname ? "block" : "hidden"} ${index === 0 ? "rounded-l-[60px] rounded-tr-[20px] rounded-br-[100px]" : index === navs.length - 1 ? "rounded-tl-[100px] rounded-r-[60px] rounded-bl-[20px]" : "rounded-tl-[100px] rounded-tr-[20px] rounded-br-[100px] rounded-bl-[20px]"} indicator absolute top-0 left-0 z-10 h-full w-full bg-[#c0c726]`}
              // style={{
              //   borderRadius: "22px 5px 36px 22px",
              //   animation: "",
              // }}
            ></div>
            <a
              className={"block px-[8vw] py-[2vw] md:px-10 md:py-2"}
              onClick={() => {
                router.push(nav.href);
              }}
            >
              <span
                className={`relative z-20 text-lg font-extrabold ${nav.href === pathname ? "text-black" : "text-white"}`}
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
