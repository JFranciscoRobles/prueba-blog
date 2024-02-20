import api from "@/lib/client/fetchClient";

export const postService = {
  newPost,
  getPosts
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

