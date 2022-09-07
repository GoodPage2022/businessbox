import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

type Data = {
  name: string
}

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {

    try {
      const response = await axios.get(`${process.env.cockpitApiUrl}/collections/get/Businesses?token=${process.env.cockpitApiToken}&limit=4`)
      res.status(200).json( response.data )
    } catch (err: any) {
      res.status(500).json({err: JSON.stringify(err)})
    }
}

export default handler