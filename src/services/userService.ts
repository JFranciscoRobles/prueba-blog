
import { db } from "@/lib/db";
import api from "@/lib/fetchClient";

export const userService = {
  authenticate,
  newUser,
};

async function authenticate(email: string, password: string) {

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
  await api("/api/users", {
    method: "POST",
    data,
  });
}
