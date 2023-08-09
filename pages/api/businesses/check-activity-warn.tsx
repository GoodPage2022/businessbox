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
  const twentyThreeDaysAgo = new Date();
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 7); // plus 7 days
  twentyThreeDaysAgo.setDate(today.getDate() - 23); // minus 23 days
  const inactiveDate = new Date(sevenDaysLater).toLocaleDateString(
    "uk-UA",
    timeformat
  );
  const twentyThreeDaysAgoMs = Math.floor(twentyThreeDaysAgo.getTime());
  const twentyThreeDaysAgoSec = Math.floor(twentyThreeDaysAgo.getTime() / 1000);

  try {
    const query = {
      $and: [
        { _created: { $lt: twentyThreeDaysAgoSec } },
        {
          $or: [
            { _order: { $exists: false } },
            { _order: { $lt: twentyThreeDaysAgoMs } },
          ],
        },
        {
          $or: [
            { _activationTimeStamp: { $exists: false } },
            { _activationTimeStamp: { $lt: twentyThreeDaysAgoSec } },
          ],
        },
        {
          $or: [{ warned: { $exists: false } }, { warned: false }],
        },
      ],
    };

    const businesses = await db
      .collection("collections_Businesses")
      .find(query)
      .toArray();

    // console.log(businesses, "businesses");
    if (businesses.length > 0)
      for (let index = 0; index < businesses.length; index++) {
        let userEmail = "";
        if (businesses[index].contact_seller_email) {
          userEmail = businesses[index].contact_seller_email;
        } else {
          const user = await axios.post(
            `${process.env.baseUrl}/api/account/list`,
            {
              userId: businesses[index]._by,
            }
          );
          userEmail = user.data[0].email;
        }

        const reqData = {
          toEmail: /* "80970410371q@gmail.com" */ userEmail,
          date: inactiveDate,
          businessLink: `https://bissbox.com/catalog/${businesses[index]._id}`,
        };

        const emailResponse = await axios.post(
          `${process.env.baseUrl}/api/businesses/send-warn`,
          reqData
        );
        console.log(emailResponse.data, "asdadsasd");

        if (emailResponse.data === "Email sent") {
          const res = await axios.post(
            `${process.env.baseUrl}/api/businesses/add-warn`,
            {
              id: businesses[index]._id,
            }
          );
        }
      }

    res.status(200).json(businesses);
  } catch (err: any) {
    res.status(500).json({ error: err });
  }
};

export default handler;
