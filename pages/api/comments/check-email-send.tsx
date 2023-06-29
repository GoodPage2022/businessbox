import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import clientPromise from "../../../mongodb/mongodb";
import { ObjectId } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token =
    req.body.user != null && req.body.user?.api_key !== undefined
      ? req.body.user.api_key
      : process.env.cockpitApiToken;

  let queryUrl = `${process.env.cockpitApiUrl}/collections/get/Comments?token=${token}`;

  let body: any = {
    filter: {
      is_approved: true,
      is_send_email: { $eq: false, $exists: true },
    },
  };

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const client = await clientPromise;
    const db = client.db("bubox");
    const response = await axios.post(queryUrl, body, options);

    if (response.data.entries.length === 0) {
      return;
    }
    const comements = response.data.entries;

    comements.map(async (item: any) => {
      const user = {};
      const business = await axios.post(
        `${process.env.baseUrl}/api/businesses/get`,
        { user, projectId: item.business._id }
      );

      const businessOwner = business.data.entries[0]._by;

      const response = await axios.post(
        `${process.env.baseUrl}/api/account/list`,
        {
          userId: businessOwner,
        }
      );

      const userEmail = response.data[0].email;

      const reqData = {
        toEmail: userEmail,
        comment: item.comment,
        businessLink: `${process.env.baseUrl}/catalog/${item.business._id}`,
      };

      const emailResponse = await axios.post(
        `${process.env.baseUrl}/api/comments/send`,
        reqData
      );

      if (emailResponse.data === "Email sent") {
        const commentResponse = await db
          .collection("collections_Comments")
          .findOneAndUpdate(
            {
              _id: new ObjectId(item._id.toString()),
            },
            {
              $set: {
                is_send_email: true,
                _modified: Date.now().toString().substring(0, 10),
              },
            },
            { returnDocument: "after" }
          );
      }
    });
    res.status(200).json(response.data);
  } catch (err: any) {
    console.log(err, "errrerer");

    res.status(500).json({ error: err });
  }
};

export default handler;
