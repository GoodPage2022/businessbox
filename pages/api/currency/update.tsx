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
    const { data: currencies }: { data: PrivatBankCurency[] } = await axios.get(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`)
    const currencyUSD = currencies.find((currency) => currency.ccy == "USD")

    try {
        const client = await clientPromise
        const db = client.db("bubox")
        const dbSingletons = await db.collection('singletons')
                .updateOne({key: "global_settings"}, 
                           {$set: {"val.currencyUSD": currencyUSD?.sale}})        
    } catch (error) {
        return res.status(500).send("Error")
    } 

    return res.status(200).send(currencyUSD?.sale)
}

export default handler