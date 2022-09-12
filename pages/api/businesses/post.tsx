import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

type Data = {
  name: string
}

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
    const token = req.body.user != null ? req.body.user.api_key : process.env.cockpitApiToken
    const data = {
      data: req.body.data
    }

    try {
      const newBusinessResponse = await axios.post(`${process.env.cockpitApiUrl}/collections/save/Businesses?token=${token}`, data)
      res.status(200).json({ data: newBusinessResponse.data })
    } catch (err: any) {
      res.status(500).json({err: JSON.stringify(err)})
    }
}

export default handler