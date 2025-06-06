import urlModel from "../model/urlModel";
import { nanoid } from "nanoid";

const BASE_URL = 'http://localhost:3000';

const shortenUrl = async (req, res) =>{
    const { originalUrl } = req.body;

    if(!originalUrl){
        return res.status(400).json({ message: "Please provide a valid URL" });
    }

    const shortCode = nanoid(7);

    try {
        const newUrl = await urlModel.create({ originalUrl, shortCode });
         await newUrl.save();

                 res.json({
            shortUrl: `${BASE_URL}/${shortCode}`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create new URL" });
    }
}



export default {shortenUrl}