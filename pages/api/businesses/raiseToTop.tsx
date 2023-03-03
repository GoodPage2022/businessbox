import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../mongodb/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const bodyParams = req.body
    const dataDecoded = Buffer.from(bodyParams.data, 'base64').toString('utf8')
    const dataParsed = JSON.parse(dataDecoded)

    if (!dataParsed.order_id) {
        return res.status(500).send({ err: "order_id is required" });
    }

    if (dataParsed.status != "success") {
        return res.status(500).send({ err: "Payment Error" });
    }

    try {
        const client = await clientPromise;
        const db = client.db("bubox");

        const orderTop = await db
            .collection("collections_toporders").findOneAndUpdate({
                _id: new ObjectId(dataParsed.order_id)
            }, {
                $set: {
                    status: 'Paid',
                    _modified: Date.now().toString().substring(0, 10)
                }
            })

        const raised = await db
            .collection("collections_Businesses")
            .updateMany(
                { _id: { $in: orderTop.value?.projects.map((id:string) => new ObjectId(id)) } },
                { $set: { _order: Date.now() } },
            );  

        return res.status(200).send(orderTop);
    } catch (error: any) {
        console.log(error);
        return res.status(500).send(error);
    }
};

export default handler;
