// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../mongodb/mongodb'

type Data = {
  name: string
}

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {

  try {
    const client = await clientPromise
    const db = client.db("bubox")
    const da = await db.collection('cockpit_accounts').find({ email: {$eq: "growler625@gmail.com"} }).limit(2).toArray()
    console.log("dahere");
    console.log(da);
    
  } catch (error) {
    console.log(error);
  } 


  res.status(200).json({ name: 'John Doe' })
}

export default handler