import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

type Data = {
  name: string
}

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {

    const data = {
      data: req.body
    }

    try {
      const newBusinessResponse = await axios.post(`${process.env.cockpitApiUrl}/collections/save/Businesses?token=${process.env.cockpitApiToken}`, data)
      res.status(200).json({ data: JSON.stringify(newBusinessResponse.data) })
    } catch (err: any) {
      res.status(500).json({err: JSON.stringify(err)})
    }
}

export default handler