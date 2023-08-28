import { NextApiHandler } from "next";
import clientPromise from "../../../mongodb/mongodb";

const filter: NextApiHandler = async (_, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("bubox");
    const dbFilteredData = await db
      .collection("collections_experts")
      .distinct("field_of_expertise");

    res.status(200).send(dbFilteredData);
  } catch (e) {
    res.status(500).send({ message: "Server Error" });
  }
};

export default filter;
