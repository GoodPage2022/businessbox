import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let msg = "Заявка з сайту\r\n";
  if (req.body.hasOwnProperty("title")) msg = req.body.title + "\r\n";
  if (req.body.hasOwnProperty("url") && req.body.url.length > 0)
    msg += "Url: " + req.body.url + "\r\n";
  if (req.body.hasOwnProperty("name")) msg += "Ім'я: " + req.body.name + "\r\n";
  if (req.body.hasOwnProperty("phone") && req.body.phone.length > 0)
    msg += "Phone: " + req.body.phone + "\r\n";
  if (req.body.hasOwnProperty("email") && req.body.email.length > 0)
    msg += "Email: " + req.body.email + "\r\n";
  if (
    req.body.hasOwnProperty("areaOfBusiness") &&
    req.body.areaOfBusiness.length > 0
  )
    msg += "Сфера бізнесу: " + req.body.areaOfBusiness + "\r\n";
  if (req.body.hasOwnProperty("comment") && req.body.comment.length > 0)
    msg += "Питання: " + req.body.comment + "\r\n";
  const endpoint =
    "https://api.telegram.org/bot" + process.env.botKey + "/sendMessage";
  const data = {
    chat_id: "-1001697526786",
    text: msg,
  };

  const u = new URLSearchParams(data).toString();

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(endpoint + "?" + u, options);

  const result = await response.json();

  res.status(200).json(result);
};

export default handler;
