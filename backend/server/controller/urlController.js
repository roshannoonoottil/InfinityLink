import urlModel from "../model/urlModel.js";
import { nanoid } from "nanoid";

const BASE_URL = 'http://localhost:3000';

const shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;

    if (!originalUrl) {
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

const redirectUrl = async (req, res) => {
    const { shortCode } = req.params;
    try {
        const url = await urlModel.findOne({ shortCode });
        if (!url) {
            return res.status(404).json({ message: "URL not found" });
        }
        res.redirect(url.originalUrl);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to redirect URL" });
    }
}



export default { shortenUrl, redirectUrl }