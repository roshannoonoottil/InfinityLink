import { connect, Schema, model } from "mongoose";
import 'dotenv/config';


export const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URL);
    
    console.log("✅ Connected to MongoDB successfully!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};


const urlSchema = new Schema({
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});


export default model('Url', urlSchema);