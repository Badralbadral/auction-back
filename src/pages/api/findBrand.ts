import { corsAllow } from "@/helper/cors";
import connect from "@/helper/db";
import { filteredByBrand } from "@/services/carService";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connect();
  await corsAllow(req, res);
  const data = req.query;

  try {
    const foundBrand = await filteredByBrand(data?.slug as string);
    res
      .status(200)
      .json({ message: "successfully filtered by brand", result: foundBrand });
  } catch (e: any) {
    return res.status(403).json({ message: e.message });
  }
};

export default handler;
