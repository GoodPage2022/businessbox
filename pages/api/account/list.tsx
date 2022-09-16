import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const data = req.body;

  const filter = {
    filter: {
      _id: data.userId,
    },
  };

  try {
    const token =
      req.body.user != null && req.body.user?.api_key !== undefined
        ? req.body.user.api_key
        : process.env.cockpitApiToken;

    const response = await axios.post(
      `${process.env.cockpitApiUrl}/cockpit/listUsers?token=${token}`,
      filter,
    );

    if (response.data.length == 0) {
      res.status(500).json("User not found");
    }

    let user = response.data[0];
    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json(err);
    console.log(err);
  }
};

export default handler;
