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
        return res.status(200).send( response.data )
      } catch (err: any) {
        console.log(err);
        return res.status(500).send(err)
      }
    } else {
      const accessToken = data.session.accessToken
      
      if (accessToken === undefined || accessToken == '')
        return res.status(500).send("accessToken is required")

      // Create user if not found after GoogleAuth
      try {
        const client = await clientPromise
        const db = client.db("bubox")
        const users = await db.collection('cockpit_accounts')
                  .find({ email: data.session.user.email }).toArray()

        if (!users.length) {
          const randomPassword = (Math.random() * 1000000000)
            .toString(36)
            .slice(-10)
            .replace(".", "");
  
          const options = {
            headers: { 
              'Content-Type': 'application/json'
            }
          }
          
          const responseNewUser = await axios.post(`${process.env.cockpitApiUrl}/cockpit/saveUser?token=${process.env.cockpitApiToken}`, {
            user: {
              user: data.session.user.email, 
              name: data.session.given_name,
              surname: data.session.family_name,
              email: data.session.user.email, 
              active: true,
              group: "user",
              password: randomPassword,
              api_key: 1
            }
          }, options)
        }
      } catch (error) {
        console.log(error);
        return res.status(500).send(error)
      } 

      // Update cockpitApiToken after GoogleAuth
      try {
        const client = await clientPromise
        const db = client.db("bubox")
        const da = await db.collection('cockpit_accounts')
                  .updateOne({ email: data.session.user.email }, 
                            { $set: { api_key: `account-${accessToken}` } })        
      } catch (error) {
        console.log(error);
        return res.status(500).send(error)
      } 

      const filter = {
        filter: {
          email: data.session.user.email
        }
      }

      try {
        const response = await axios.post(`${process.env.cockpitApiUrl}/cockpit/listUsers?token=${process.env.cockpitApiToken}`, filter)

        if (response.data.length == 0) {
          return res.status(500).send("User not found")
        }
        
        const user = {
          ...response.data[0],
          api_key: `account-${accessToken}`
        }
        return res.status(200).send( user )
      } catch (err: any) {
        console.log(err);
        return res.status(500).send(err)
      }
    }

}

export default handler