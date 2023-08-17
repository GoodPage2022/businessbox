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
    console.log(comements, "comements");

    for (let index = 0; index < comements.length; index++) {
      const user = {};
      const business = await axios.post(
        `${process.env.baseUrl}/api/businesses/get`,
        { user, projectId: comements[index].business._id }
      );
      let userEmail = "";
      console.log(business.data.entries, "business");
      if (business.data.entries.length == 0) {
        continue;
      }
      if (business.data.entries[0].contact_seller_email) {
        userEmail = business.data.entries[0].contact_seller_email;
      } else {
        const businessOwner = business.data.entries[0]._by;
        const response = await axios.post(
          `${process.env.baseUrl}/api/account/list`,
          {
            userId: businessOwner,
          }
        );

        userEmail = response.data[0].email;
      }

      console.log(userEmail, "userEmail");

      const reqData = {
        toEmail: userEmail,
        comment: comements[index].comment,
        businessLink: `${process.env.baseUrl}/catalog/${comements[index].business._id}`,
      };
      console.log(reqData, " reqData");
      const emailResponse = await axios.post(
        `${process.env.baseUrl}/api/comments/send`,
        reqData
      );

      if (emailResponse.data === "Email sent") {
        const commentResponse = await db
          .collection("collections_Comments")
          .findOneAndUpdate(
            {
              _id: new ObjectId(comements[index]._id.toString()),
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
    }
    res.status(200).json(response.data);
  } catch (err: any) {
    console.log(err, "errrerer");

    res.status(500).json({ error: err });
  }
};

export default handler;
