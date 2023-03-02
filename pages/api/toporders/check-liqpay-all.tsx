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
    .collection("collections_toporders")
    .aggregate()
    .toArray();
  // console.log(orders, "orderssss");

  let ordersProcessed:any = []

  try {
    await Promise.all(orders.map(async (item: any) => {
      if (item.status == "Pending") {
        await new Promise<void>(resolve => {
          liqpay.api(
            "request",
            {
              action: "status",
              version: "3",
              order_id: item._id.toString(),
            },
            async (json: any) => {
              let status = "Pending"

              ordersProcessed.push({
                order: item._id.toString(),
                status: json.data?.status,
                code: json.data?.code
              })

              if (json.data?.status == "success") {
                status = "Paid"
              }

              if (json.data?.status == "error") {
                status = "Payment not found"
              }                

              const order = await db
                .collection("collections_requesttoverify")
                .updateOne(
                  {
                    _id: new ObjectId(item._id.toString()),
                  },
                  {
                    $set: {
                      status: status,
                    },
                  },
                );

              resolve()
            },
            async (json: any) => {
              ordersProcessed.push({
                order: item._id.toString(),
                status: 'request error'
              })

              resolve()
            },
          );
        })
      }
    }));

    return res.status(200).send(ordersProcessed);
  } catch (error) {
    return res.status(500).send(error);
  }

};

export default handler;
