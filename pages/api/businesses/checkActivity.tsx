import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../mongodb/mongodb";
import { ObjectId } from "mongodb";
import axios from "axios";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const client = await clientPromise;
  const db = client.db("bubox");

  const timeformat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const today = new Date();
  const twentyOneDaysAgo = new Date();
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 7); // plus 7 days
  twentyOneDaysAgo.setDate(today.getDate() - 23); // minus 23 days
  const inactiveDate = new Date(sevenDaysLater).toLocaleDateString(
    "uk-UA",
    timeformat
  );
  const twentyOneDaysAgoMs = Math.floor(twentyOneDaysAgo.getTime());
  const twentyOneDaysAgoSec = Math.floor(twentyOneDaysAgo.getTime() / 1000);
  // console.log(inactiveDate, "ffffffff");

  try {
    const query = {
      $and: [
        { _created: { $lt: twentyOneDaysAgoSec } },
        {
          $or: [
            { _order: { $exists: false } },
            { _order: { $lt: twentyOneDaysAgoMs } },
          ],
        },
        {
          $or: [
            { _activationTimeStamp: { $exists: false } },
            { _activationTimeStamp: { $lt: twentyOneDaysAgoSec } },
          ],
        },
      ],
    };

    const businesses = await db
      .collection("collections_Businesses")
      .find(query)
      .limit(2)
      .toArray();

    businesses.map(async (item) => {
      const user = await axios.post(`${process.env.baseUrl}/api/account/list`, {
        userId: item._by,
      });

      const userEmail = user.data[0].email;
      console.log(userEmail, "userEmail");

      const reqData = {
        toEmail: "80970410371q@gmail.com" /* userEmail */,
        date: inactiveDate,
        businessLink: `${process.env.baseUrl}/catalog/${item._id}`,
      };

      // const emailResponse = await axios.post(
      //   `${process.env.baseUrl}/api/businesses/send-warn`,
      //   reqData
      // );

      // console.log(emailResponse, "emailResponse");
    });

    // console.log(businesses, "da");

    res.status(200).json(businesses);
  } catch (err: any) {
    res.status(500).json({ error: err });
  }
};

export default handler;
