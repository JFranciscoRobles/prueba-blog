import api from "@/lib/client/fetchClient";

export const postService = {
  newPost,
  getPosts,
  updatePost
};

export async function newPost(data: any) {
  const result = await api("/api/posts", {
    method: "POST",
    data,
  });
  return result
}

export async function getPosts(searchParams?: any) {
 const result = await api("/api/posts", {
    method: "GET",
    params: searchParams
  })
  return result
}


export async function updatePost(data: any, postId: string) {
  const result = await api(`/api/posts/${postId}`, {
     method: "PATCH",
     data
   })
   return result
 }