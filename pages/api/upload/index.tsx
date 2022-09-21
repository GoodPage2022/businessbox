import { IncomingForm } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from 'fs';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

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

      const image = await fs.readFile(oldPath);

      // Step 2: The s3Client function validates your request and directs it to your Space's specified endpoint using the AWS SDK.
      const s3Client = new S3Client({
        endpoint: "https://daydrive.fra1.digitaloceanspaces.com", // Find your endpoint in the control panel, under Settings. Prepend "https://".
        region: "fra1", // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
        credentials: {
          accessKeyId: "DO00QXCGYN37XV3W66BZ", // Access key pair. You can create access key pairs using the control panel or API.
          secretAccessKey: "3EQWMtV/x6S3iwOaJO6BQL7oi/lstGdyUNz8qgMhUd0" // Secret access key defined through an environment variable.
        }
      });

      // Step 3: Define the parameters for the object you want to upload.
      const params = {
        Bucket: "daydrive", // The path to the directory you want to upload the object to, starting with your Space name.
        Key: "test.txt", // Object key, referenced whenever you want to access this file later.
        Body: "image!", // The object's contents. This variable is an object, not a string.
        ACL: "public", // Defines ACL permissions, such as private or public.
      };


      // Step 4: Define a function that uploads your object using SDK's PutObjectCommand object and catches any errors.
      const uploadObject = async () => {
        try {
          const data = await s3Client.send(new PutObjectCommand(params));
          console.log(
            "Successfully uploaded object: " +
              params.Bucket +
              "/" +
              params.Key
          );
          return data;
        } catch (err) {
          console.log("Error", err);
        }
      };

      uploadObject()

      // mv(oldPath, newPath, function (err: any) {
      //   return res.status(504).send(err);
      // });
      // await fs.writeFile(newPath, image);
      return res.status(200).send({ fields, files });
    });
  } catch (error) {
    return res.status(504).send(error);
  }
}
