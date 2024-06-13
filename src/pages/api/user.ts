import { corsAllow } from "@/helper/cors";
import connect from "@/helper/db";
import { getUsers } from "@/services/userService";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connect();
  await corsAllow(req, res);

  switch (req.method) {
    case "GET":
      try {
        const users = await getUsers();
        res.status(200).json(users);
      } catch (e: any) {
        return res.status(400).json({ message: e.message });
      }
      break;
  }
};

export default handler;
