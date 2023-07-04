import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../mongodb/mongodb";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30); // minus 30 days
  const thirtyDaysAgoAgoMs = Math.floor(thirtyDaysAgo.getTime());

  let pipeLine = [
    {
      $match: {
        $and: [
          { _order: { $exists: true } },
          { _order: { $gt: thirtyDaysAgoAgoMs } },
        ],
      },
    },
  ];

  try {
    const client = await clientPromise;
    const db = client.db("bubox");

    const budinesses = await db
      .collection("collections_Businesses")
      .aggregate(pipeLine)
      .limit(99)
      .toArray();
    return res
      .status(200)
      .send({ entries: budinesses, total: budinesses.length });
  } catch (error: any) {
    console.log(error);

    return res
      .status(error.response ? error.response.status ?? 500 : 500)
      .send(error);
  }
};

export default handler;
