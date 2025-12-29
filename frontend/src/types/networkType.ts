export interface Friend {
  backgroundImg?: string;
  createdAt: string;
  email: string;
  headline?: string;
  id: string;
  image?: string;
  name: string;
}

export interface UserFriendsProps {
  friendData: Friend;
}

export interface FriendRequest {
  id: string;
  senderId: string;
  recipientId: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;

  recipient: Friend;
}
export interface User {
  id: string;
  email: string;
  password: string | null;
  name: string | null;
  emailVerified: boolean | null;

  image: string | null;
  backgroundImg: string | null;
  bio: string | null;
  headline: string | null;
  location: string | null;
  company: string | null;
  designation: string | null;
  experience: number | null;

  skills: string[];
  friends: string[];

  createdAt: string;
  updatedAt: string;
}

export interface SentRequest {
  id: string;
  senderId: string;
  recipientId: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
  recipient?: User;
}

export interface SentRequestProp {
  friendData: SentRequest;
}

export interface ReceivedRequest {
  id: string;
  senderId: string;
  recipientId: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
  recipient?: User;
  sender?: User;
}

export interface RecievedRequestProp {
  friendData: ReceivedRequest;
}

export interface SentReqData{
  id: string;
  senderId: string;
  recipientId: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
}
