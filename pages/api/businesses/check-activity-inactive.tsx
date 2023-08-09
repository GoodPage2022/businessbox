import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../mongodb/mongodb";
import { ObjectId } from "mongodb";
import axios from "axios";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const client = await clientPromise;
  const db = client.db("bubox");

  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30); // minus 30 days

  const thirtyDaysAgoMs = Math.floor(thirtyDaysAgo.getTime());
  const thirtyDaysAgoSec = Math.floor(thirtyDaysAgo.getTime() / 1000);

  try {
    const query = {
      $and: [
        { _created: { $lt: thirtyDaysAgoSec } },
        {
          $or: [
            { _order: { $exists: false } },
            { _order: { $lt: thirtyDaysAgoMs } },
          ],
        },
        {
          $or: [
            { _activationTimeStamp: { $exists: false } },
            { _activationTimeStamp: { $lt: thirtyDaysAgoSec } },
          ],
        },
      ],
    };

    const businesses = await db
      .collection("collections_Businesses")
      .find(query)
      .toArray();
    if (businesses.length > 0)
      for (let index = 0; index < businesses.length; index++) {
        const response = await axios.post(
          `${process.env.baseUrl}/api/businesses/inactiveBusiness`,
          { id: businesses[index]._id }
        );
        console.log(response.data, "response");
      }

    res.status(200).json(businesses);
  } catch (err: any) {
    res.status(500).json({ error: err });
  }
};

export default handler;
