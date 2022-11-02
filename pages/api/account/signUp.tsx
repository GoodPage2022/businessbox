import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const data = req.body;
  const newUser = {
    user: data.user,
  };

  try {
    const newUserResponse = await axios.post(
      `${process.env.cockpitApiUrl}/cockpit/saveUser?token=${process.env.cockpitApiToken}`,
      newUser,
    );
    res.status(200).json(newUserResponse.data);
  } catch (err: any) {
    res.status(500).json(err.response.data);
  }
};

export default handler;
