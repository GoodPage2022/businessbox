import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import clientPromise from "../../../mongodb/mongodb";
import { inspect } from "util";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const token =
    req.body.user != null && req.body.user?.api_key !== undefined
      ? req.body.user.api_key
      : process.env.cockpitApiToken;
  const queryFilter = req.body.filter;
  const queryLimit = req.body.limit;
  const querySort = req.body.sort;
  const querySkip = req.body.skip;
  const queryRate = req.body.rate;

  // let queryUrl = `${process.env.cockpitApiUrl}/collections/get/Businesses?token=${token}`;

  let pipeLine = [];

  // let body: any = {};

  if (queryFilter) {
    // body["filter"] = queryFilter;
    pipeLine.push({ $match: queryFilter });
  }

  if (querySort) {
    // body["sort"] = querySort;
    let sortValue =
      querySort?.price == "Відсортувати за зменшенням ціни" ? 1 : -1;
    if (querySort["price"]) {
      pipeLine.push({
        $addFields: {
          priceDig: {
            $cond: [
              { $eq: ["$currency", "Долар"] },
              { $multiply: [queryRate, { $toDouble: "$price" }] },
              { $toDouble: "$price" },
            ],
          },
        },
      });
      delete querySort.price;
    }
    let queryOrder = { priceDig: sortValue, ...querySort };
    pipeLine.push({ $sort: queryOrder });
  }

  if (querySkip) {
    // body["skip"] = querySkip;
    pipeLine.push({ $skip: querySkip });
  }

  if (queryLimit) {
    // body["limit"] = queryLimit;
    pipeLine.push({ $limit: queryLimit });
  }

  // console.log(pipeLine);
  // console.log(JSON.stringify(pipeLine, null, 4));

  try {
    const client = await clientPromise;
    const db = client.db("bubox");
    // const response = await axios.post(queryUrl, body, options);
    const budinesses = await db
      .collection("collections_Businesses")
      .aggregate(pipeLine)
      .toArray();
    return res
      .status(200)
      .send({ entries: budinesses, total: budinesses.length });
  } catch (error: any) {
    // console.log(error);

    return res
      .status(error.response ? error.response.status ?? 500 : 500)
      .send(error);
  }
};

export default handler;
