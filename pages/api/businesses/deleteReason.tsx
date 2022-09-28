import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

type Data = {
  name: string
}

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
    const token = (req.body.user != null && req.body.user?.api_key !== undefined) ? req.body.user.api_key : process.env.cockpitApiToken
    const data = {
      data: {
        reason: req.body.deleteReason + (req.body.deleteReasonOther ? (": " + req.body.deleteReasonOther) : ""),
        business: req.body.projectTitle
      }
    }

    try {
      const newBusinessResponse = await axios.post(`${process.env.cockpitApiUrl}/collections/save/BusinessesDeleteReasons?token=${token}`, data)
      res.status(200).json({ data: newBusinessResponse.data })
    } catch (err: any) {
      console.log(err);
      res.status(500).json({err: JSON.stringify(err)})
    }
}

export default handler