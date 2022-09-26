// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
    try {
        const areas = await axios.post(`https://api.novaposhta.ua/v2.0/json/`, {
            apiKey: "01c35c69bf9f9230b7c13a3145602b3c",
            modelName: "Address",
            calledMethod: "getAreas"
        });
    
        if (areas.data.data.length && areas.status == 200) {
            const areasList = areas.data.data.map((area: any)=>({
                label: area.Description,
                value: area.Ref
            }))
        
            return res.status(200).send(areasList)
        }
    } catch (error: any) {
        return res.status(200).send(error)
    }
}

export default handler