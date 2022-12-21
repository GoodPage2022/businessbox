import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import clientPromise from "../../../mongodb/mongodb";
import { ObjectId } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const token = process.env.cockpitApiToken;
    const queryParams = req.query
    const bodyParams = req.body

    if (!bodyParams.order_id) {
        return res.status(500).send({ err: "order_id is required" });
    }

    if (bodyParams.status != "success") {
        return res.status(500).send({ err: "Payment Error" });
    }

    try {
        const client = await clientPromise;
        const db = client.db("bubox");

        const orderComplete = await db
            .collection("collections_requesttoverify")
            .updateOne({
                _id: new ObjectId(bodyParams.order_id.toString())
            }, {
                $set: {
                    status: 'Paid'
                }
            })
  
        return res.status(200).send({ success: true });
    } catch (err: any) {
        console.log(err);
        return res.status(500).send({ err: JSON.stringify(err) });
    }
};

export default handler;
