import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const reqData = req.body.data
  const token = (req.body.user != null && req.body.user?.api_key !== undefined) ? req.body.user.api_key : process.env.cockpitApiToken
  const data = {
    data: {
      user: req.body.user._id,
      comment: reqData.comment,
      date: reqData.date,
      business: {
        _id: reqData.business_id,
        link: "Businesses",
        display: reqData.business_title,
      }
    }
  }

  console.log(data);
  

  try {
    const newBusinessResponse = await axios.post(`${process.env.cockpitApiUrl}/collections/save/Comments?token=${token}`, data)
    res.status(200).json({ data: newBusinessResponse.data })
  } catch (err: any) {
    console.log("err");
    // console.log(req.body.user);
    
    res.status(500).json({err: JSON.stringify(err)})
  }
};

export default handler;
