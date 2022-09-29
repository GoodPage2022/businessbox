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
  const queryLimit = req.body.limit
  const querySort = req.body.sort
  const querySkip = req.body.skip

  let queryUrl = `${process.env.cockpitApiUrl}/collections/get/Businesses?token=${token}`

  let body: any = {}

  if (queryFilter) {
    body["filter"] = queryFilter
  }

  if (querySort) {
    body["sort"] = querySort
  }

  if (queryLimit) {
    body["limit"] = queryLimit
  }

  if (querySkip) {
    body["skip"] = querySkip
  }

  const options = {
    headers: { 
      'Content-Type': 'application/json'
    }
  }
  
  try {
    const response = await axios.post(queryUrl, body, options)
    return res.status(200).send( response.data )
  } catch (error: any) {
    return res.status((error.response ? (error.response.status ?? 500) : 500)).send(error)
  }
}

export default handler