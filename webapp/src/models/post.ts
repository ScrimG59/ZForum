import { Thread } from "./thread";

export interface Post {
  Id: number;
  Description: string;
  PostedBy: number; // should be a user id
  CreatedIn: Thread; // should be the thread where the post got posted in
  Created: Date;
}
