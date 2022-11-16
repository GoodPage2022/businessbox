import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../mongodb/mongodb";
import { ObjectID } from "mongodb";
import axios from "axios";
import sendpulse from "sendpulse-api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const reqBody = req.body;

  const userApiKeyPiece = reqBody.resetKey.slice(-10);
  const userIdPiece = reqBody.resetKey.slice(0, -10);
  try {
    const client = await clientPromise;
    const db = client.db("bubox");
    const resetUserPassword = await db
      .collection("cockpit_accounts")
      .find({ _id: new ObjectID(userIdPiece) })
      .project({ api_key: 1, email: 1 })
      .limit(1)
      .toArray();
    const userApiKeyFull = resetUserPassword[0].api_key;

    if (userApiKeyFull.slice(-10) != userApiKeyPiece)
      return res.status(403).send("User apy key is not valid");

    try {
      const randomPasswordPre = (Math.random() * 1000000000)
        .toString(36)
        .slice(-10)
        .replace(".", "");
      const randomPasswordPost = (Math.random() * 1000000000)
        .toString(36)
        .slice(-10)
        .replace(".", "");
      const randomPassword = randomPasswordPre + randomPasswordPost;

      const user = {
        _id: userIdPiece,
        password: randomPassword,
      };

      const response = await axios.post(
        `${process.env.cockpitApiUrl}/cockpit/saveUser?token=${userApiKeyFull}`,
        { user },
      );

      if (response.status == 200) {
        // var data = {
        //     service_id: process.env.emailjsServiceId,
        //     template_id: process.env.emailjsTemplateId2,
        //     user_id: process.env.emailjsUserId,
        //     accessToken: process.env.emailjsAccessToken,
        //     template_params: {
        //         to_email: resetUserPassword[0].email,
        //         password: randomPassword
        //     }
        // };

        const userId = process.env.sendpulseUserId;
        const secret = process.env.sendpulseSecret;
        const tokenStorage = process.env.sendpulseTokenStorage;
        const templateId = process.env.sendpulseTemplateId2;
        const subject = process.env.sendpulseSubject2;
        const data = {
          template: {
            id: templateId,
            variables: {
              password: randomPassword,
            },
          },
          subject: subject,
          from: {
            name: "Business box",
            email: "info@bissbox.com",
          },
          to: [
            {
              email: resetUserPassword[0].email,
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
          //   const response = await axios.post(
          //     "https://api.emailjs.com/api/v1.0/email/send",
          //     data,
          //   );
          //   console.log(response);
        } catch (error: any) {
          console.log(error);
        }
      }

      return res.status(200).send("User pwd reseted");
    } catch (err: any) {
      return res.status(500).send(err);
    }
  } catch (error) {
    return res.status(504).send(error);
  }
};

export default handler;
