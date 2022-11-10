import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const data = req.body;
  const newUser = {
    user: {
      ...data.user,
      group: "user",
      api_key: 1,
      user: data.user.email,
      active: true /* false !!!!!!!!!!!!!! */,
    },
  };

  try {
    const newUserResponse = await axios.post(
      `${process.env.cockpitApiUrl}/cockpit/saveUser?token=${process.env.cockpitApiToken}`,
      newUser,
    );

    // if (newUserResponse.status == 200) {
    //   const activateKey =
    //     newUserResponse.data._id.toString() +
    //     newUserResponse.data.api_key.toString().slice(-10);
    //   const userActivationLink =
    //     `${process.env.baseUrl}/account/activate/` + activateKey;

    //   const emailData = {
    //     service_id: process.env.emailjsServiceId,
    //     template_id: process.env.emailjsTemplateId,
    //     user_id: process.env.emailjsUserId,
    //     accessToken: process.env.emailjsAccessToken,
    //     template_params: {
    //       to_email: data.user.email,
    //       link: userActivationLink,
    //     },
    //   };

    //   try {
    //     const response = await axios.post(
    //       "https://api.emailjs.com/api/v1.0/email/send",
    //       emailData,
    //     );
    //     console.log(response);
    //   } catch (error: any) {
    //     console.log(error);
    //   }
    // }
    res.status(200).json(newUserResponse.data);
  } catch (err: any) {
    res.status(500).json(err?.response?.data);
  }
};

export default handler;
