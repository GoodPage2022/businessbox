import { IncomingForm } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import aws from "aws-sdk";

import clientPromise from "../../../mongodb/mongodb";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const form = new IncomingForm();
    form.parse(req, async (err: any, fields: any, files: any) => {
      if (err) return res.status(501).send({});

      const userApiKey = fields.userApiKey;
      const userEmail = fields.userEmail;

      const client = await clientPromise;

      const db = client.db("bubox");

      const checkUserApiKey = await db
        .collection("cockpit_accounts")
        .find({ api_key: userApiKey, email: userEmail })
        .limit(1)
        .toArray();

      if (checkUserApiKey.length == 0) {
        return res.status(404).send("User not found");
      }

      const oldPath = files.file.filepath;

      const image = await fs.readFile(oldPath);

      const s3 = new aws.S3({
        endpoint: process.env.digiSpaceEndpoint,
        accessKeyId: process.env.digiSpaceAccessKeyId,
        secretAccessKey: process.env.digiSpaceSecretAccessKey,
      });

      s3.upload(
        {
          Bucket: "daydrive",
          ACL: "public-read",
          Key: `${fields.folder ?? `avatars`}/${files.file.originalFilename}`,
          Body: image,
        },
        {
          partSize: 10 * 1024 * 1024,
          queueSize: 10,
        },
      ).send((err, data) => {
        if (err) return res.status(500).send({ err });

        return res.status(200).send({ fields, url: data.Location });
      });
    });
  } catch (error) {
    console.log("error");
    console.log(error);

    return res.status(504).send(error);
  }
}
