import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../mongodb/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const bodyParams = req.body

    try {
        const client = await clientPromise;
        const db = client.db("bubox");

        const orderTop = await db.collection("collections_toporders").insertOne({
            projects: bodyParams.projects,
            user: bodyParams.user,
            status: bodyParams.status
        })

        return res.status(200).send(orderTop);
    } catch (error: any) {
        console.log(error);
        return res.status(500).send(error);
    }
};

export default handler;
