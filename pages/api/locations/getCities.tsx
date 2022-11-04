// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../mongodb/mongodb'
import axios from "axios";

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse
) => {
    const reqData = req.body
    
    try {
        const client = await clientPromise
        const db = client.db("bubox")
        const dbCities = await db.collection('collections_Cities')
        .find({ AreaId: reqData.selectedArea }).toArray()
        
        const listCities = dbCities.map((a:any)=>({
            label: a.Title,
            value: a._id
        }))

        const listCitiesSorted = listCities.sort((a, b) => {
            let fa = a.label.toLowerCase(),
                fb = b.label.toLowerCase();
        
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });

        return res.status(200).send(listCitiesSorted)
    } catch (error) {
        console.log("error");
        console.log(error);
        return res.status(500).send(error)
    }     
}

export default handler