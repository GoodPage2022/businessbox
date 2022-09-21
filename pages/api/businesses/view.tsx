import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
import clientPromise from '../../../mongodb/mongodb'

type Data = {
  name: string
}

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const token = process.env.cockpitApiToken
  const id = req.body.project._id
  const projectViewCount = req.body.project.view_count ?? 0

  const data = {
    data: {
        _id: id,
        view_count: parseInt(projectViewCount) + 1,
    }
  }

  try {
    const client = await clientPromise
    const db = client.db("bubox")
    const da = await db.collection('collections_Businesses')
              .updateOne({ _id: data.data._id }, 
                        { $set: { view_count: data.data.view_count } })        
    res.status(200).json( da )
  } catch (err: any) {
    res.status(500).json({error: err})
  }
}

export default handler