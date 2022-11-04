import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../mongodb/mongodb'
import axios from "axios";

interface PrivatBankCurency {
    ccy: string
    base_ccy: string
    buy: number
    sale: number
}

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse
) => {
    try {
        const client = await clientPromise
        const db = client.db("bubox")
        const dbRate = await db.collection('singletons')
                .find({key: "global_settings"}).toArray()        
            return res.status(200).send(parseFloat(dbRate[0]?.val?.currencyUSD).toFixed(2))
        } catch (error) {
        return res.status(500).send("Error")
    } 
}

export default handler