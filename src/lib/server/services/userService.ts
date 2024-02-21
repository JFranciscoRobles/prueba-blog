
import api from "@/lib/client/fetchClient";
import { db } from "@/lib/server/db";

export const userService = {
  authenticate,
  newUser,
};

async function authenticate(email: string) {

try {
  const user = await db.user.findFirst({
    where: {
      email: email,
    },
  });


  return user;
} catch (error) {
  return error
}
}

export async function newUser(data: any) {
  console.log(data)
  await api("/api/users", {
    method: "POST",
    data,
  });
}
