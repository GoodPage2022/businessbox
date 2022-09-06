import { IncomingForm } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";

var mv = require("mv");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const form = new IncomingForm();
    form.parse(req, (err: any, fields: any, files: any) => {
      if (err) return res.status(501).send({});

      var oldPath = files.file.filepath;
      var newPath = `./public/avatars/${files.file.originalFilename}`;
      mv(oldPath, newPath, function (err: any) {});
      return res.status(200).send({ fields, files });
    });
  } catch (error) {
    return res.status(504).send({});
  }
}