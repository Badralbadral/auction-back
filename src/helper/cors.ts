import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

export const corsAllow = async (req: NextApiRequest, res: NextApiResponse) => {
  return await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });
};
