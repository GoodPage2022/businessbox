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
  const id = req.body.project._id
  const projectViewCount = req.body.project.view_count ?? 0

  const data = {
    data: {
        _id: id,
        view_count: parseInt(projectViewCount) + 1
    }
  }

  try {
    const response = await axios.post(`${process.env.cockpitApiUrl}/collections/save/Businesses?token=${token}`, data)
    res.status(200).json( response.data )
  } catch (err: any) {
    res.status(500).json({error: err})
  }
}

export default handler