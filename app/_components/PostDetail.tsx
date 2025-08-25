import Modal from "@/app/_components/Modal";
import PostImagesSwiper from "@/app/_components/PostImagesSwiper";
import { getBaseUrlInRSC } from "@/app/_lib/utils";

export default async function PostDetail({ id }: { id: string }) {
  const baseUrl = await getBaseUrlInRSC();
  const postResp = await fetch(`${baseUrl}/api/posts/${id}`);
  const post: Post = await postResp.json();

  return (
    <Modal
      title={
        <PostAuthor
          avatar={post.author.image}
          nickname={post.author.displayUsername}
        />
      }
      prevPath={"/"}
    >
      <div className="flex max-h-[80dvh] flex-col overflow-y-auto p-4 md:h-[64vh] md:w-[80vw] md:flex-row">
        <div className="images flex w-full items-center rounded-2xl border-4 border-[#353535] md:w-2/5">
          <PostImagesSwiper images={post.images} />
        </div>
        <div className="post-content mt-4 rounded-2xl bg-black p-4 md:mt-0 md:ml-2 md:w-3/5">
          <div className="h-full overflow-y-scroll">
            <h3 className="text-lg font-bold text-white">{post.title}</h3>
            <p className="font-bold whitespace-pre-line text-[#b2b2b2]">
              {post.content}
            </p>
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
