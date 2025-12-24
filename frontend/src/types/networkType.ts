export interface Friend{
    backgroundImg? : string;
    createdAt : string;
    email:string;
    headline?:string;
    id:string;
    image?:string;
    name:string;
}

export interface UserFriendsProps {
  friendData: Friend;
}