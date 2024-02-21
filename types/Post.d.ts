import { Post } from "@prisma/client";

interface PostWithAuthor extends Post {
    author: User;
  }