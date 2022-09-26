// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../mongodb/mongodb'
import axios from "axios";

import locations from "../../src/constants/koatuu.json"

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse
) => {

  // let dbAreas:any

  // try {
  //   const client = await clientPromise
  //   const db = client.db("bubox")
  //   dbAreas = await db.collection('collections_Areas')
  //             .find().toArray()        
  // } catch (error) {
  //   console.log("error");
  //   console.log(error);
  // } 


  // const cities:any = []

  // let area = ""

  // const loc = locations as Object[]
  // const locat = loc.map((l: any)=>{
  //   if (l["Другий рівень"].toString() == "") {
  //     area = l["Назва об'єкта українською мовою"].toString()
  //   }

  //   if (l["Четвертий рівень"].toString() != "") {
  //     if (l["Четвертий рівень"].toString().slice(-2) != "00")
  //       cities.push({...l, areaLabel: area, areaId: dbAreas.filter((a:any)=>a.title==area)?.[0]._id.toString()})
  //       return true;
  //   }

  //   if (l["Третій рівень"].toString() != "") {
  //     if (l["Третій рівень"].toString().slice(-4) != "0000")
  //       cities.push({...l, areaLabel: area, areaId: dbAreas.filter((a:any)=>a.title==area)?.[0]._id.toString()})
  //       return true;
  //   }

  //   if (l["Другий рівень"].toString() != "") {
  //     if (l["Другий рівень"].toString().slice(-7) != "0000000")
  //       cities.push({...l, areaLabel: area, areaId: dbAreas.filter((a:any)=>a.title==area)?.[0]._id.toString()})
  //       return true;
  //   }

  // })


  // const citiesPost = cities.map((c:any)=>({
  //   AreaId: c.areaId,
  //   Title: c["Назва об'єкта українською мовою"],
  //   SettlementTypeDescription: c["Категорія"] == "М" ? "Місто" : (c["Категорія"] == "Р" ? "Район у місті з районним поділом" : (c["Категорія"] == "С" ? "Село" : (c["Категорія"] == "Т" ? "Селище міського типу" : (c["Категорія"] == "Щ" ? "Селище" : "")))),
  //   AreaDescription: c.areaLabel,
  // }))

  // // console.log(citiesPost);
  // console.log(citiesPost.length);
  
  // const areasToSave = areas.map((a:any)=>({
  //   title: a["Назва об'єкта українською мовою"].toString()
  // }))

  // const cities = await axios.post(`https://api.novaposhta.ua/v2.0/json/`, {
  //   apiKey: "01c35c69bf9f9230b7c13a3145602b3c",
  //   modelName: "Address",
  //   calledMethod: "getSettlements",
  //    methodProperties: {
  //        Limit : "2000",
  //        Page : "1"
  //   }   
  // });

  // const citiesToInsert = cities.data.data.map((city: any)=>({
  //   title: city.Description,
  //   SettlementTypeDescription: city.Description,
  //   AreaDescription: city.AreaDescription
  // }))

  // console.log(citiesToInsert);
  

  // try {
  //   const client = await clientPromise
  //   const db = client.db("bubox")
  //   const da = await db.collection('collections_Cities')
  //             .insertMany(citiesPost)        
  // } catch (error) {
  //   console.log("error");
  //   console.log(error);
  // } 

  res.status(200).json({ name: 'John Doe' })
}

export default handler