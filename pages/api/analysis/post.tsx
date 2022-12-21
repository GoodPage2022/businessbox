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
  const data = {
    data: req.body.request,
  };

  try {
    const analysisResponse = await axios.post(
      `${process.env.cockpitApiUrl}/collections/save/requesttoverify?token=${token}`,
      data,
    );
    return res.status(200).send(analysisResponse.data);
  } catch (err: any) {
    console.log(err);
    return res.status(500).send({ err: JSON.stringify(err) });
  }
};

export default handler;
