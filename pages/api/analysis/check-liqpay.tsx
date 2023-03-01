import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import LiqPay from "@azarat/liqpay";
import clientPromise from "../../../mongodb/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { orderId } = req.body;

  const liqpay = new LiqPay(
    process.env.liqpayClientId ?? "",
    process.env.liqpayClientSecret ?? "",
  );

  liqpay.api(
    "request",
    {
      action: "status",
      version: "3",
      order_id: orderId,
    },
    async (json: any) => {
      if (json.data?.status == "success") {
        const client = await clientPromise;
        const db = client.db("bubox");

        const order = await db
          .collection("collections_requesttoverify")
          .updateOne(
            {
              _id: new ObjectId(orderId),
            },
            {
              $set: {
                status: "Paid",
              },
            },
          );
      }
      return res.status(200).send(json.data.status);
    },
    async (json: any) => {
      return res.status(500).send(json.data);
    },
  );
};

export default handler;
