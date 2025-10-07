import OpenAI from "openai";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://incredible-cat-d6cc49.netlify.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});
const port = process.env.PORT || 3000;

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const responseFromAi = await openai.images.generate({
      model: "dall-e-2",
      prompt,
      n: 1,
      size: "512x512",
    });
    res.send(responseFromAi.data);
  } catch (error) {
    console.error(`Error generating image: ${error}`);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
