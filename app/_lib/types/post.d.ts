declare interface Post {
  id: string;
  title: string;
  content: string;
  images: string[];
  authorId: string;
  author: {
    avatar: string;
    nickname: string;
  };
  views: number;
}

declare interface PostForm {
  title: string;
  content: string;
}
