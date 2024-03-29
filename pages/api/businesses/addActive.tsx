import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../mongodb/mongodb";
import { ObjectId } from "mongodb";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const id = req.body.id;

  try {
    const client = await clientPromise;
    const db = client.db("bubox");
    const da = await db.collection("collections_Businesses").updateMany(
      {},
      {
        $set: {
          active: true,
        },
      }
    );

    res.status(200).json(da);
  } catch (err: any) {
    res.status(500).json({ error: err });
  }
};

export default handler;
