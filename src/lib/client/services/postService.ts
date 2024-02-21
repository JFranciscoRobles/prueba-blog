import api from "@/lib/client/fetchClient";
import { Session } from "next-auth";

export const postService = {
  newPost,
  getPosts,
  updatePost,
  getPostById,
  getPostByUser
};

export async function newPost(data: any) {
  const result = await api("/api/posts", {
    method: "POST",
    data,
  });
  return result
}

export async function getPostById(postId:string) {
  const result = await api(`/api/posts/${postId}`, {
    method: "GET",
  })
  return result
}

export async function getPostByUser(userId:string, searchParams?: any, ) {
  const result = await api(`/api/posts/`, {
    method: "GET",
    params: {
      ...searchParams,
      userId,
      Published: undefined,
    }
  })
  return result
}

export async function getPosts(searchParams?: any) {
 const result = await api("/api/posts", {
    method: "GET",
    params: {...searchParams, Published: true}
  })
  return result
}


export async function updatePost(data: any, postId: string, session: Session) {
  const result = await api(`/api/posts/${postId}`, {
     method: "PATCH",
     data,
     headers: {
      Authorization: session.user.id,
     }
   })
   return result
 }