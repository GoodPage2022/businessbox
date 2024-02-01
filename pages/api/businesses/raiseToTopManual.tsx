import type { NextApiRequest, NextApiResponse } from "next";
import RaiseToTop from "../../../src/utils/raiseToTop";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { args }: any = req.body;

  if (args[0] != "toporders" || args[2] != false)
    return res.status(500).send("error");

  const { manual_order, _id } = args[1];

  if (manual_order != true) return res.status(200).send(false);

  try {
    const orderTop = RaiseToTop(_id);
    return res.status(200).send(orderTop);
  } catch (error: any) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export default handler;
