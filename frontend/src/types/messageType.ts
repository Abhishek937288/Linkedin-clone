export interface Message{
    id :   string ;
  senderId  : string;
  receiverId  : string;
  delivered  : boolean  ;
  content  : string ;
  read  : boolean;
  createdAt  : string;
}