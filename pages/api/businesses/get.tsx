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

  try {
    const response = await axios.get(`${process.env.cockpitApiUrl}/collections/get/Businesses?token=${token}&limit=4`)
    res.status(200).json( response.data )
  } catch (err: any) {
    res.status(500).json({error: err})
  }
}

export default handler