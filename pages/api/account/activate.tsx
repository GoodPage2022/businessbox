import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../mongodb/mongodb";
import { ObjectID } from "mongodb";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const reqBody = req.body;

  const userApiKeyPiece = reqBody.key.slice(-10);
  const userIdPiece = reqBody.key.slice(0, -10);

  try {
    const client = await clientPromise;
    const db = client.db("bubox");
    const activateUserAccount = await db
      .collection("cockpit_accounts")
      .find({ _id: new ObjectID(userIdPiece) })
      .project({ api_key: 1, email: 1 })
      .limit(1)
      .toArray();
    const userApiKeyFull = activateUserAccount[0].api_key;

    if (userApiKeyFull.slice(-10) != userApiKeyPiece)
      return res.status(403).send("User apy key is not valid");

    try {
      const user = {
        _id: userIdPiece,
        active: true,
      };

      const response = await axios.post(
        `${process.env.cockpitApiUrl}/cockpit/saveUser?token=${userApiKeyFull}`,
        { user },
      );

      return res.status(200).send("User activated");
    } catch (err: any) {
      return res.status(500).send(err);
    }
  } catch (error) {
    return res.status(504).send(error);
  }
};

export default handler;
