import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../mongodb/mongodb'
import axios from "axios";

type Data = {
  name: string
}

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {

    const data = req.body

    if (data.session === undefined) {
      try {
        const response = await axios.post(`${process.env.cockpitApiUrl}/cockpit/authUser?token=${process.env.cockpitApiToken}`, data)
        res.status(200).json( response.data )
      } catch (err: any) {
        res.status(500).json(err)
        console.log(err);
      }
    } else {
      const accessToken = data.session.accessToken
      
      if (accessToken === undefined || accessToken == '')
        res.status(500).json("accessToken is required")

      try {
        const client = await clientPromise
        const db = client.db("bubox")
        const da = await db.collection('cockpit_accounts')
                  .updateOne({ email: data.session.user.email }, 
                            { $set: { api_key: `account-${accessToken}` } })        
      } catch (error) {
        res.status(500).json(error)
        console.log(error);
        console.log(error);
      } 

      const filter = {
        filter: {
          email: data.session.user.email
        }
      }

      try {
        const response = await axios.post(`${process.env.cockpitApiUrl}/cockpit/listUsers?token=${process.env.cockpitApiToken}`, filter)

        if (response.data.length == 0) {
          res.status(500).json("User not found")
        }
        
        const user = {
          ...response.data[0],
          api_key: `account-${accessToken}`
        }
        res.status(200).json( user )
      } catch (err: any) {
        res.status(500).json(err)
        console.log(err);
      }
    }

}

export default handler