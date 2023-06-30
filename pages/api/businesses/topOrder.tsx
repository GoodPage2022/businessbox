import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../mongodb/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const bodyParams = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("bubox");

    const businesses = await db
      .collection("collections_Businesses")
      .find({
        _id: { $in: bodyParams.projects.map((b: any) => new ObjectId(b)) },
      })
      .toArray();

    const projects = businesses.map((b: any) => ({
      _id: b._id.toString(),
      link: "Businesses",
      display: b.title,
    }));

    const orderTop = await db.collection("collections_toporders").insertOne({
      projects: projects,
      user: (({ api_key, i18n, _created, _modified, ...user }) => user)(
        bodyParams.user
      ),
      email: bodyParams.user.email,
      status: bodyParams.status,
      date: Date.now(),
      _created: Date.now().toString().substring(0, 10),
      _modified: Date.now().toString().substring(0, 10),
    });

    return res.status(200).send(orderTop);
  } catch (error: any) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export default handler;
