import { corsAllow } from "@/helper/cors";
import connect from "@/helper/db";
import { createUser } from "@/services/userService";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connect();
  await corsAllow(req, res);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const data = req.body;
  const { firstName, lastName, email, password } = data;
  try {
    const user = await createUser(firstName, lastName, email, password);
    res.status(200).json({ message: "Succesfully user created", user });
    console.log("Succesfully User Created");
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
};
export default handler;
