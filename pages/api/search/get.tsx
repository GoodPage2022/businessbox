import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const token =
    req.body.user != null && req.body.user?.api_key !== undefined
      ? req.body.user.api_key
      : process.env.cockpitApiToken;
  const queryFilter = req.body.filter;

  let queryUrl = `${process.env.cockpitApiUrl}/collections/get/Businesses?token=${token}`;

  let body: any = {
    limit: 10,
    sort: {
      _created: -1,
    },
  };

  if (queryFilter) {
    body["filter"] = {
      $or: [
        {
          title: {
            $regex: queryFilter,
            $options: "i",
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

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(queryUrl, body, options);
    res.status(200).json(response.data);
  } catch (err: any) {
    res.status(500).json({ error: err });
  }
};

export default handler;
