import type { NextApiRequest, NextApiResponse } from "next";
import { loginService } from "@/services/userService";
import connect from "@/helper/db";
import { corsAllow } from "@/helper/cors";

type Data = {
  message?: string;
  token?: string;
  userEmail?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connect();
  await corsAllow(req, res);
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const data = req.body;
  const { email, password } = data;
  try {
    const token = await loginService(email, password);
    if (token) {
      return res.status(200).json({
        token: token,
        message: "Login successful",
        userEmail: data.email,
      });
    }
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
}
