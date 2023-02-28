import axios from "axios";
import crypto from "crypto";
import LiqPay from "@azarat/liqpay";

const str_to_sign = (str: string) => {
  const sha1 = crypto.createHash("sha1");
  sha1.update(str);
  return sha1.digest("base64");
};

const handler = async (req: any, res: any) => {
  const { orderId } = req.body;

  const liqpay = new LiqPay(
    process.env.liqpayClientId ?? "",
    process.env.liqpayClientSecret ?? "",
  );

  console.log(orderId, "orderId");

  liqpay.api(
    "request",
    {
      action: "status",
      version: "3",
      order_id: orderId,
    },
    async (json: any) => {
      if (json.data?.status == "success") {
        const options = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
        };

        const data = {
          orderId,
        };

        // const response = await axios.post(`${process.env.apiUrl}/index.php?route=api/sale/liqpay|success&api_token=${apiToken}`, data, options);
      }
      return res.status(200).send(json.data.status);
    },
    async (json: any) => {
      return res.status(500).send(json.data);
    },
  );
};

export default handler;
