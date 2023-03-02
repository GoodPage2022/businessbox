import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import LiqPay from "@azarat/liqpay";
import clientPromise from "../../../mongodb/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const liqpay = new LiqPay(
    process.env.liqpayClientId ?? "",
    process.env.liqpayClientSecret ?? "",
  );
  const client = await clientPromise;
  const db = client.db("bubox");

  const orders = await db
    .collection("collections_requesttoverify")
    .aggregate()
    .toArray();
  // console.log(orders, "orderssss");

  orders.forEach((item: any) => {
    if (item.status == "Pending") {
      liqpay.api(
        "request",
        {
          action: "status",
          version: "3",
          order_id: item._id,
        },
        async (json: any) => {
          if (json.data?.status == "success") {
          }
          return res.status(200).send(json.data.status);
        },
        async (json: any) => {
          return res.status(500).send(json.data);
        },
      );
    }
  });
};

export default handler;
