import { Post } from "./post";

export class Thread {
  Id: number;
  Title: string;
  Description: string;
  Posts?: Post[];
  CreationDate: string;
  Username: string;
  UserId: number;
}
