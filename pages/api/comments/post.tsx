import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    res.status(200);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ err: JSON.stringify(err) });
  }
};

export default handler;
