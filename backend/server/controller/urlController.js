import urlModel from "../model/urlModel.js";
import { nanoid } from "nanoid";

const BASE_URL = 'https://il-vzak.onrender.com' || 'http://localhost:3000';

import axios from 'axios';

// Helper: Check valid URL format
const isValidURL = (url) => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};

// Helper: Check domain is present
const hasDomain = (url) => {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.hostname !== '';
    } catch (e) {
        return false;
    }
};

// (Optional) Helper: Check if URL is reachable
const checkUrlExists = async (url) => {
    try {
        const response = await axios.head(url, { timeout: 5000 });
        return response.status >= 200 && response.status < 400;
    } catch (error) {
        return false;
    }
};

export const shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;

    if (!originalUrl) {
        return res.status(400).json({ message: "Please provide a URL" });
    }

    // 1️⃣ Check valid format
    if (!isValidURL(originalUrl)) {
        return res.status(400).json({ message: "Invalid URL format" });
    }

    // 2️⃣ Check domain
    if (!hasDomain(originalUrl)) {
        return res.status(400).json({ message: "URL does not contain a valid domain" });
    }

    // 3️⃣ Check if URL exists
    const urlExists = await checkUrlExists(originalUrl);
    if (!urlExists) {
        return res.status(400).json({ message: "URL is unreachable or does not exist" });
    }

    // All checks passed → proceed to shorten
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
};


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