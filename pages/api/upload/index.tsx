import { IncomingForm } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from 'fs';

var mv = require("mv");

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
      const newPath = `public/${fields.folder ?? `avatars`}/${files.file.originalFilename}`;
      // mv(oldPath, newPath, function (err: any) {
      //   return res.status(504).send(err);
      // });
      const image = await fs.readFile(oldPath);
      await fs.writeFile(newPath, image);
      return res.status(200).send({ fields, files });
    });
  } catch (error) {
    return res.status(504).send(error);
  }
}
