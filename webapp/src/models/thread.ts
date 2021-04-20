import { Post } from "./Post";

export class Thread {
  Id: number;
  Title: string;
  Content: string;
  Posts?: Post[];
  CreationDate: string;
  Username: string;
  UserId: number;
}
