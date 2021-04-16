import { Post } from "./post";
import { User } from "./user";

export interface Thread {
  Id: number;
  Title: string;
  Description: string;
  Posts?: Post[];
  CreationDate: string;
  Username: string;
  UserId: number;
}
