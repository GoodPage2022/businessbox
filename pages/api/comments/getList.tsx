import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token =
    req.body.user != null && req.body.user?.api_key !== undefined
      ? req.body.user.api_key
      : process.env.cockpitApiToken;
  const queryFilter = req.body.filter;
  const queryLimit = req.body.limit;
  const querySort = req.body.sort;
  const querySkip = req.body.skip;

  let queryUrl = `${process.env.cockpitApiUrl}/collections/get/Comments?token=${token}`;

  let body: any = {};

  if (queryFilter) {
    body["filter"] = {
      ...queryFilter,
      is_approved: true,
    };
  }

  if (querySort) {
    body["sort"] = querySort;
  }

  if (queryLimit) {
    body["limit"] = queryLimit;
  }

  if (querySkip) {
    body["skip"] = querySkip;
  }

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(queryUrl, body, options);
    // console.log(response.data);

    res.status(200).json(response.data);
  } catch (err: any) {
    res.status(500).json({ error: err });
  }
};

export default handler;
