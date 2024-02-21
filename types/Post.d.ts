import { Post } from "@prisma/client";

interface PostWithAuthor extends Post {
    author: User;
  }

  export type PageInfo = {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
  };