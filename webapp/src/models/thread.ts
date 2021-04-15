import { Post } from "./post";
import { User } from "./user";

export interface Thread {
  Id: number;
  Title: string;
  Description: string;
  Posts?: Post[];
  Created: string;
  CreatedBy?: User;
}
