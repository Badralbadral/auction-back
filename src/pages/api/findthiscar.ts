import { corsAllow } from "@/helper/cors";
import connect from "@/helper/db";
import { findCar } from "@/services/carService";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connect();
  await corsAllow(req, res);
  const data = req.query;
  try {
    const foundCar = await findCar(data?.slug as string);
    res
      .status(200)
      .json({ message: "Car successfully found", result: foundCar });
  } catch (e: any) {
    return res.status(403).json({ message: e.message });
  }
};

export default handler;
