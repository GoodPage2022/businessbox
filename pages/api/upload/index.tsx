import { IncomingForm } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from 'fs';
import aws from "aws-sdk";

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
      
      const oldPath = files.file.filepath;
      // const newPath = `public/${fields.folder ?? `avatars`}/${files.file.originalFilename}`;

      const image = await fs.readFile(oldPath);

      const s3 = new aws.S3({
        endpoint: "fra1.digitaloceanspaces.com",
        accessKeyId: "DO00QXCGYN37XV3W66BZ",
        secretAccessKey: "3EQWMtV/x6S3iwOaJO6BQL7oi/lstGdyUNz8qgMhUd0"
      });

      s3.upload({
        Bucket: "daydrive",
        ACL: "public-read",
        Key: `${fields.folder ?? `avatars`}/${files.file.originalFilename}`,
        Body: image,
      }, {
        partSize: 10 * 1024 * 1024,
        queueSize: 10,
      }).send((err, data) => {
        if (err) return res.status(500).send({ err });
        
        return res.status(200).send({ fields, url: data.Location });
        // return res.status(200).send({
        //   url: data.Location
        // });
      });

      // return res.status(500).send({ fields, files });
    });
  } catch (error) {
    return res.status(504).send(error);
  }
}
