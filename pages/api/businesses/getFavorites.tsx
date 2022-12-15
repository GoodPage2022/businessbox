import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../mongodb/mongodb";
import { ObjectId } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const token =
    req.body.user != null && req.body.user?.api_key !== undefined
      ? req.body.user.api_key
      : process.env.cockpitApiToken;
  const queryFilter = req.body.filter;
  const queryLimit = req.body.limit;
  const querySkip = req.body.skip;

  let pipeLine = [];

  if (queryFilter) {
    console.log(queryFilter);
    
    pipeLine.push({
        $match: {
            _id: {
                $in: queryFilter.map((f: any) => new ObjectId(f._id)),
            }
        }
    });
  }

  if (querySkip) {
    pipeLine.push({ $skip: querySkip });
  }

  if (queryLimit) {
    pipeLine.push({ $limit: queryLimit });
  }

  try {
    const client = await clientPromise;
    const db = client.db("bubox");

    const budinesses = await db
      .collection("collections_Businesses")
      .aggregate(pipeLine)
      .toArray();

      return res
      .status(200)
      .send({ entries: budinesses, total: budinesses.length });
  } catch (error: any) {
    return res
      .status(error.response ? error.response.status ?? 500 : 500)
      .send(error);
  }
};

export default handler;
