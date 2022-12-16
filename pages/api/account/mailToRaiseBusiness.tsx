import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../mongodb/mongodb";

import sendpulse from "sendpulse-api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const reqBody = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("bubox");
    const userToReset = await db
      .collection("cockpit_accounts")
      .find({ email: { $eq: reqBody.to_email } })
      .limit(1)
      .toArray();

    if (!userToReset.length) return res.status(404).send("User not found");

    const userId = process.env.sendpulseUserId;
    const secret = process.env.sendpulseSecret;
    const tokenStorage = process.env.sendpulseTokenStorage;
    const templateId = process.env.sendpulseTemplateId1;
    const subject = process.env.sendpulseSubject1;

    const data = {
      template: {
        id: templateId,
        variables: {},
      },
      subject: subject,
      from: {
        name: "Business box",
        email: "info@bissbox.com",
      },
      to: [
        {
          email: reqBody.to_email,
        },
      ],
    };

    try {
      sendpulse.init(userId, secret, tokenStorage, function () {
        const answerGetter = function answerGetter(data: any) {
          console.log(data);
        };
        sendpulse.smtpSendMail(answerGetter, data);
      });
    } catch (error: any) {
      console.log(error);
    }

    return res.status(200).send("mail to raise business sent");
  } catch (error) {
    return res.status(504).send(error);
  }
};

export default handler;
