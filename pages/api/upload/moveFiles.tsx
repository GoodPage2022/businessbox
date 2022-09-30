import aws from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let response;

    const tempFiles = req.body.tempPaths;
    const projectId = req.body.subFolder;

    const s3 = new aws.S3({
      endpoint: process.env.digiSpaceEndpoint,
      accessKeyId: process.env.digiSpaceAccessKeyId,
      secretAccessKey: process.env.digiSpaceSecretAccessKey,
    });

    s3.listObjects(
      { Bucket: "daydrive", Prefix: "businesses/temp" },
      function (err, data) {
        if (data?.Contents?.length) {
          data.Contents.forEach((file: any) => {
            if (
              tempFiles.includes(
                `https://daydrive.${process.env.digiSpaceEndpoint}/${file.Key}`,
              )
            ) {
              var params = {
                Bucket: "daydrive",
                CopySource: `daydrive/${file.Key}`,
                Key: file.Key.replace(
                  "businesses/temp",
                  `businesses/${projectId}`,
                ),
              };

              s3.copyObject(params, function (copyErr, copyData) {
                response = copyData;
                if (copyErr) {
                  console.log(copyErr);
                } else {
                  console.log("Copied: ", params.Key);
                }
              });
            }
          });
        }
      },
    );
    return res.status(200).send(response);
  } catch (error) {
    console.log("error");
    console.log(error);

    return res.status(504).send(error);
  }
}
