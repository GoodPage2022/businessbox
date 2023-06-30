import type { NextApiRequest, NextApiResponse } from "next";

import sendpulse from "sendpulse-api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const reqBody = req.body;

  try {
    const userId = process.env.sendpulseUserId;
    const secret = process.env.sendpulseSecret;
    const tokenStorage = process.env.sendpulseTokenStorage;
    const templateId = process.env.sendpulseTemplateId3;
    const subject = "Новий коментар під Вашим бізнесом";

    const data = {
      template: {
        id: templateId,
        variables: {
          businessLink: req.body.businessLink,
          commentText: req.body.comment,
        },
      },
      subject: subject,
      from: {
        name: "Business box",
        email: "info@bissbox.com",
      },
      to: [
        {
          email: reqBody.toEmail,
        },
      ],
    };

    sendpulse.init(userId, secret, tokenStorage, function () {
      const answerGetter = function answerGetter(data: any) {
        console.log(data);
      };
      sendpulse.smtpSendMail(answerGetter, data);
    });

    return res.status(200).send("Email sent");
  } catch (error) {
    return res.status(504).send(error);
  }
};

export default handler;
