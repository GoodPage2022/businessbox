import type { NextApiRequest, NextApiResponse } from "next";
import emailjs from '@emailjs/browser';
import axios from "axios";
import clientPromise from '../../../mongodb/mongodb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const reqBody = req.body

    try {
        const client = await clientPromise
        const db = client.db("bubox")
        const userToReset = await db.collection('cockpit_accounts').find({ email: {$eq: reqBody.to_email} }).limit(1).toArray()
    
        if (!userToReset.length) 
            return res.status(404).send('User not found');

        const resetKey = userToReset[0]._id.toString() + userToReset[0].api_key.toString().slice(-10)
        const resetLink = 'https://business-box.vercel.app/reset/' + resetKey

        var data = {
            service_id: process.env.emailjsServiceId,
            template_id: process.env.emailjsTemplateId,
            user_id: process.env.emailjsUserId,
            accessToken: process.env.emailjsAccessToken,
            template_params: {
                to_email: reqBody.to_email,
                link: resetLink    
            }
        };


        try {
            const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', data)
            console.log(response);
        } catch (error: any) {
            console.log(error);
        }

        return res.status(200).send("Reset email sent");
    } catch (error) {
        return res.status(504).send(error);
    }
}

export default handler