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
  const querySkip = req.body.skip;

  let pipeLine = [];

  // let body: any = {};

  if (queryFilter) {
    pipeLine.push({ $match: queryFilter });
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
