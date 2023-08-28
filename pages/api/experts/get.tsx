import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import clientPromise from "../../../mongodb/mongodb";
import { inspect } from "util";
import { ObjectId } from "mongodb";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const expertId = req.body.expertId;

  console.log(expertId, "body");

  try {
    const client = await clientPromise;
    const db = client.db("bubox");

    const expert = await db
      .collection("collections_experts")
      .find({ _id: new ObjectId(expertId) })
      .toArray();

    console.log(expert, "ffgfgfg");

    return res.status(200).send({ entries: expert });
  } catch (error: any) {
    // console.log(error);

    return res
      .status(error.response ? error.response.status ?? 500 : 500)
      .send(error);
  }
};

export default handler;
