import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../mongodb/mongodb";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const queryFilter = req.body.filter;

  try {
    const client = await clientPromise;
    const db = client.db("bubox");

    const slides = await db
      .collection("collections_investSlider")
      .find()
      .toArray();

    return res.status(200).send({ entries: slides });
  } catch (error: any) {
    return res
      .status(error.response ? error.response.status ?? 500 : 500)
      .send(error);
  }
};

export default handler;
