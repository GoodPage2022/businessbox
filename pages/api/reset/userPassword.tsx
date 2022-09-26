import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from '../../../mongodb/mongodb'
import { ObjectID } from 'mongodb'
import axios from "axios";
import emailjs from '@emailjs/browser';

// import nodemailer from "nodemailer";
// import Mail from "nodemailer/lib/mailer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const reqBody = req.body

    const userApiKeyPiece = reqBody.resetKey.slice(-10)
    const userIdPiece = reqBody.resetKey.slice(0, -10)
    // console.log(userApiKeyPiece);
    // console.log(userIdPiece);

    try {
        const client = await clientPromise
        const db = client.db("bubox")
        const resetUserPassword = await db.collection('cockpit_accounts').find({ _id: new ObjectID(userIdPiece) }).project({ api_key: 1, email: 1 }).limit(1).toArray()
        const userApiKeyFull = resetUserPassword[0].api_key

        if (userApiKeyFull.slice(-10) != userApiKeyPiece)
            return res.status(403).send("User apy key is not valid");

        try {
            const randomPasswordPre = (Math.random() * 1000000000).toString(36).slice(-10).replace('.', '')
            const randomPasswordPost = (Math.random() * 1000000000).toString(36).slice(-10).replace('.', '')
            const randomPassword = randomPasswordPre + randomPasswordPost
            
            const user = {
                _id: userIdPiece,
                password: randomPassword
            }
            
            const response = await axios.post(`${process.env.cockpitApiUrl}/cockpit/saveUser?token=${userApiKeyFull}`, { user })

            if (response.status == 200) {
                var data = {
                    service_id: 'service_h1w4a5p',
                    template_id: 'template_zxuesjv',
                    user_id: 'Ne1Fvf_d2zZ67EgEG',
                    accessToken: "jJ1BBXQZiWRf4bS3ish7D",
                    template_params: {
                        to_email: resetUserPassword[0].email,
                        password: randomPassword
                    }
                };


                try {
                    const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', data)
                    console.log(response);
                } catch (error: any) {
                    console.log(error);
                }
            }

            return res.status(200).send("User pwd reseted");
        } catch (err: any) {
            return res.status(500).send(err);
        }
    } catch (error) {
        return res.status(504).send(error);
    }
}

export default handler