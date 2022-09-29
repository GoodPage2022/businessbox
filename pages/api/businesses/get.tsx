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
  const id = req.body.projectId

  try {
    const response = await axios.get(`${process.env.cockpitApiUrl}/collections/get/Businesses?token=${token}&filter[_id]=${id}`)
    res.status(200).json( response.data )
  } catch (error: any) {
    res.status(500).json({error})
  }
}

export default handler