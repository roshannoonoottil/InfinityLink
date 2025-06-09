import express from 'express';
import { connectDB } from './server/model/urlModel.js';
import dotenv from 'dotenv';
import urlRouter from './router/urlRoutes.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = 3000;


app.use(
    cors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                "https://infinity-link.vercel.app", // ✅ Deployed frontend
                "http://localhost:5173", // ✅ Local development frontend
            ];
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true, // ✅ Required for cookies/auth headers
        exposedHeaders: ["set-cookie"] // Important for iOS
    })
);

app.use(express.json())

connectDB();


app.use('/', urlRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));