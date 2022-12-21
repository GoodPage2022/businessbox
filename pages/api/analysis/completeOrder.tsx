import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../mongodb/mongodb";
import { ObjectId } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const bodyParams = req.body
    const dataDecoded = JSON.parse(Buffer.from(bodyParams.data, 'base64').toString('ascii'))

    if (!dataDecoded.order_id) {
        return res.status(500).send({ err: "order_id is required" });
    }

    if (dataDecoded.status != "success") {
        return res.status(500).send({ err: "Payment Error" });
    }

    try {
        const client = await clientPromise;
        const db = client.db("bubox");

        const orderComplete = await db
            .collection("collections_requesttoverify")
            .updateOne({
                _id: new ObjectId(dataDecoded.order_id.toString())
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
