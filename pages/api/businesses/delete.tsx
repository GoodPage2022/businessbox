import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token =
    req.body.user != null && req.body.user?.api_key !== undefined
      ? req.body.user.api_key
      : process.env.cockpitApiToken;
  const id = req.body.projectId;
  const deleteReason = req.body.deleteReason;

  if (deleteReason == "sold") {
    try {
      const response = await axios.post(
        `${process.env.cockpitApiUrl}/collections/save/Businesses?token=${token}`,
        {
          data: {
            _id: id,
            sold_out: true,
            active: false,
          },
        }
      );
      res.status(200).json(response.data);
    } catch (err: any) {
      res.status(500).json({ error: err });
    }
  } else {
    try {
      const response = await axios.get(
        `${process.env.cockpitApiUrl}/collections/remove/Businesses?token=${token}&filter[_id]=${id}`
      );
      res.status(200).json(response.data);
    } catch (err: any) {
      res.status(500).json({ error: err });
    }
  }
};

export default handler;
