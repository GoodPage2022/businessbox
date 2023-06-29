import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../mongodb/mongodb";
import { ObjectId } from "mongodb";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const currentDate = Date.now().toString().substring(0, 10);
  const week = 604800;
  const threeWeeks = 1814400;
  const emailDate = Number(currentDate) - week;
  console.log(emailDate, "currentDate");

  // const pipeLine: any = [];

  // if (true) {
  //   pipeLine.push({
  //     _created: {
  //       $gte: currentDate,
  //     },
  //   });
  // }

  try {
    const client = await clientPromise;
    const db = client.db("bubox");
    const da = await db
      .collection("collections_Businesses")
      .find({
        _created: {
          $gte: Number(currentDate),
        },
      })
      // .limit(5)
      .toArray();
    console.log(da, "da");

    res.status(200).json(da);
  } catch (err: any) {
    res.status(500).json({ error: err });
  }
};

export default handler;
