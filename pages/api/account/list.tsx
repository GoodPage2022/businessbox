import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const data = req.body;

  const filter = {
    filter: {
      _id: (typeof data.userId != "string") ? { $in: data.userId } : data.userId,
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
      return res.status(404).send("User not found");
    }

    let user = response.data;
    return res.status(200).send(user);
  } catch (err: any) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export default handler;
