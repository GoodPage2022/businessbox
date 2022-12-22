import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../mongodb/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const queryParams = req.query

    if (!queryParams.order_id)
        return res.status(500).send({ error: "order_id is required", queryParams });


    try {
        const client = await clientPromise;
        const db = client.db("bubox");
        const order = await db
            .collection("collections_requesttoverify")
            .findOne({
                _id: new ObjectId(queryParams.order_id.toString())
            });

        return res.status(200).send(order);
    } catch (error: any) {
        console.log(error);
        return res.status(500).send(error);
    }
};

export default handler;
