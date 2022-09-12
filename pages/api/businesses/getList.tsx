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
  const queryFilter = req.body.filter

  let queryUrl = `${process.env.cockpitApiUrl}/collections/get/Businesses?token=${token}&limit=4&sort[_created]=-1`

  if (queryFilter) {
    const filter = Object.keys(queryFilter)
      .map(
        (pn: any) => 
          "filter[" + encodeURIComponent(pn) + "]=" + encodeURIComponent(queryFilter[pn]))
      .join("&")

      queryUrl += "&" + filter
  }

  
  
  
  try {
    const response = await axios.get(queryUrl)
    res.status(200).json( response.data )
  } catch (err: any) {
    res.status(500).json({error: err})
  }
}

export default handler