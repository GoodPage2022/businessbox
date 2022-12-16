import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import clientPromise from "../../../mongodb/mongodb";
import { inspect } from "util";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const queryRate = req.body.rate;

  let pipeLine = [];

  pipeLine.push({
    $group: {
      _id: null,
      total: {
        $sum: {
          $cond: [
            { $eq: ["$currency", "Долар"] },
            { $multiply: [queryRate, { $toDouble: "$price" }] },
            { $toDouble: "$price" },
          ],
        },
      },
      count: { $sum: 1 },
    },
  });

  try {
    const client = await clientPromise;
    const db = client.db("bubox");
    const budinesses = await db
      .collection("collections_Businesses")
      .aggregate(pipeLine)
      .toArray();

    return res.status(200).send(budinesses);
  } catch (error: any) {
    console.log(error);

    return res
      .status(error.response ? error.response.status ?? 500 : 500)
      .send(error);
  }
};

export default handler;
