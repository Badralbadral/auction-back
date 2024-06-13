import { corsAllow } from "@/helper/cors";
import connect from "@/helper/db";
import {
  addBidContestantToAuction,
  createCar,
  deleteCar,
  editCarAuction,
  getCars,
} from "@/services/carService";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connect();
  if (await corsAllow(req, res)) {
    return;
  }

  switch (req.method) {
    case "GET":
      try {
        const cars = await getCars();
        res.status(200).json(cars);
      } catch (e: any) {
        return res.status(400).json({ message: e.message });
      }
      break;
    case "POST":
      try {
        const car = await createCar(
          req.body.carModel,
          req.body.brand,
          req.body.startPrice,
          req.body.description,
          req.body.carDetails,
          req.body.img,
          req.body.userId,
          req.body.endTime,
          req.body.createdAt,
          req.body.bidContestants
        );
        res.status(200).json({ message: "Car succesfully created", car });
      } catch (e: any) {
        return res.status(400).json({ message: e.message });
      }
      break;
    case "DELETE":
      try {
        const deletedCar = await deleteCar(req.body.id);
        res
          .status(200)
          .json({ message: "Car succesfully deleted", deletedCar });
        console.log("car succesfully deleted");
      } catch (e: any) {
        return res.status(400).json({ message: e.message });
      }
      break;
    case "PUT":
      try {
        await editCarAuction(req.body);
        await addBidContestantToAuction(req.body);
        res.status(200).json({ message: "Car Auction succesfully updated" });
        console.log("Car Auction succesfully updated");
      } catch (e: any) {
        return res.status(400).json({ message: e.message });
      }
      break;
  }
};

export default handler;
