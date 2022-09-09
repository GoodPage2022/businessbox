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

    if (data.session === undefined) {
      try {
        const response = await axios.post(`${process.env.cockpitApiUrl}/cockpit/authUser?token=${process.env.cockpitApiToken}`, data)
        res.status(200).json( response.data )
      } catch (err: any) {
        res.status(500).json(err)
        console.log(err);
      }
    } else {
      const filter = {
        filter: {
          email: data.session.user.email
        }
      }      

      try {
        const response = await axios.post(`${process.env.cockpitApiUrl}/cockpit/listUsers?token=${process.env.cockpitApiToken}`, filter)
        res.status(200).json( response.data[0] )
      } catch (err: any) {
        res.status(500).json(err)
        console.log(err);
      }
    }

}

export default handler