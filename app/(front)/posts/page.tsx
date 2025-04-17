"use client";

import request from "@/app/_lib/request";
import useSWR from "swr";

export default function Page() {
  const { data: posts } = useSWR("/posts", (key) =>
    request.get<never, Post[]>(key),
  );
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>标题</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={async () => {
          const res = await request.post("/posts", {
            title: "post title",
            content: "post content",
          });
          console.log(res.data);
        }}
      >
        publish
      </button>
    </div>
  );
}
