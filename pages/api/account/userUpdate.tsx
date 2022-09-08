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
    const token = req.body.user.api_key

    try {
      const response = await axios.post(`${process.env.cockpitApiUrl}/cockpit/saveUser?token=${token}`, { user: data.userUpdate })
      res.status(200).json( response.data )
    } catch (err: any) {
      res.status(500).json(err)
    }
}

export default handler