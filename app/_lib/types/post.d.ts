declare interface Post {
  id: string;
  title: string;
  content: string;
  images: string[];
  authorId: string;
  author: {
    image: string;
    displayUsername: string;
  };
  views: number;
}

declare interface PostForm {
  title: string;
  content: string;
}
