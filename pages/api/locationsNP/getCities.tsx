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
    const reqData = req.body

    try {
        const cities = await axios.post(`https://api.novaposhta.ua/v2.0/json/`, {
            apiKey: "01c35c69bf9f9230b7c13a3145602b3c",
            modelName: "Address",
            calledMethod: "getSettlements",
            methodProperties: {
                AreaRef: reqData.selectedArea
            }   
        });
    
        if (cities.data.data.length && cities.status == 200) {
            const cityList = cities.data.data.map((city: any)=>({
                label: city.Description,
                value: city.Ref
            }))
        
            return res.status(200).send(cityList)
        }

        return res.status(500).send(cities)
    } catch (error: any) {
        return res.status(500).send(error)
    }
}

export default handler