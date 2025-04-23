import Modal from "@/app/_components/Modal";
import PostImagesSwiper from "@/app/_components/PostImagesSwiper";
import { getBaseUrlInRSC } from "@/app/_lib/utils";

export default async function PostDetail({ id }: { id: string }) {
  const baseUrl = await getBaseUrlInRSC();
  const post: Post = await (await fetch(`${baseUrl}/api/posts/${id}`)).json();

  return (
    <Modal
      title={
        <PostAuthor
          avatar={post.author.avatar}
          nickname={post.author.nickname}
        />
      }
    >
      <div className="flex max-h-[500px] p-4">
        <div className="images flex w-72 items-center overflow-hidden rounded-2xl border-4 border-[#353535]">
          <PostImagesSwiper images={post.images} />
        </div>
        <div className="post-content ml-2 w-96 rounded-2xl bg-black p-4">
          <div className="h-full overflow-y-scroll">
            <h3 className="text-lg font-bold text-white">{post.title}</h3>
            <p className="font-bold text-[#b2b2b2]">{post.content}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

const PostAuthor = ({
  nickname,
  avatar,
}: {
  nickname: string;
  avatar: string;
}) => {
  return (
    <div className="flex items-center">
      <div className="rounded-full border-4 border-[#323232]">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={avatar} />
          </div>
        </div>
      </div>
      <h3 className="ml-2 font-bold text-[#7f7f7f]">{nickname}</h3>
    </div>
  );
};
