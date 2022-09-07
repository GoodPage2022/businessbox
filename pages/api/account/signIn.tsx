import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

type Data = {
  name: string
}

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {

    const data = req.body

    try {
      const response = await axios.post(`${process.env.cockpitApiUrl}/cockpit/authUser?token=${process.env.cockpitApiToken}`, data)
      res.status(200).json( response.data )
    } catch (err: any) {
      res.status(500).json({err: JSON.stringify(err)})
    }
}

export default handler