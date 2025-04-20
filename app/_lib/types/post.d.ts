declare interface Post {
  id: string;
  title: string;
  content: string;
  images: string[];
  authorId: string;
}

declare interface PostForm {
  title: string;
  content: string;
}
