import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import clientPromise from "../../../mongodb/mongodb";
import { inspect } from "util";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const queryFilter = req.body.filter;
  let pipeLine = [];
  // console.log(queryFilter, "queryFilter");

  let body: any = {
    limit: 10,
    sort: {
      _created: -1,
    },
  };

  if (queryFilter) {
    pipeLine.push({
      $match: {
        $or: [
          {
            firstname: {
              $regex: queryFilter,
              $options: "i",
            },
          },
          {
            lastname: {
              $regex: queryFilter,
              $options: "i",
            },
          },
        ],
      },
    });
  }

  if (queryFilter) {
    body["$match"] = {
      $or: [
        {
          firstname: {
            $regex: queryFilter,
            // $options: "i",
          },
        },
        {
          lastname: {
            $regex: queryFilter,
            // $options: "i",
          },
        },
        // {
        //     description: {
        //         $regex: queryFilter,
        //         $options: 'i'
        //     }
        // }
      ],
    };
  }
  console.log(body, "vody");

  try {
    const client = await clientPromise;
    const db = client.db("bubox");

    const experts = await db
      .collection("collections_experts")
      .aggregate(pipeLine)
      .toArray();

    return res.status(200).send({ entries: experts, total: experts.length });
  } catch (error: any) {
    // console.log(error);

    return res
      .status(error.response ? error.response.status ?? 500 : 500)
      .send(error);
  }
};

export default handler;
