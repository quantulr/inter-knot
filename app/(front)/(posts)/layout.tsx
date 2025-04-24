import { ReactNode } from "react";

export default function Layout({
  children,
  post,
}: {
  children: ReactNode;
  post: ReactNode;
}) {
  return (
    <section>
      {children}
      {post}
    </section>
  );
}
