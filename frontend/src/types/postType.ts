export interface User {
  id: string;
  name: string;
  image: string;
}

export interface Comment {
  id: string;
  text: string;
  user: User;
  userId: string;
  createdAt: string;
}

export interface Like {
  id :string;
  userId : string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  image: string[];
  video: string | null;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: User;
  comments: Comment[];
  likes: Like[]; 
}

export interface  AddPostFormProps {
  closeDilog: ()=> void;
}

export interface createPost {
  title:string,
  content?:string,
  image : string | string[],
  video?:string;
}

export interface deletePostId{
  id :string
}