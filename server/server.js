import OpenAI from "openai";
import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["https://incredible-cat-d6cc49.netlify.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});
const port = 3000;

//get will serve the html css side

//post will initialized image generator

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
  console.log(`Server listening at http://localhost:${port}`);
});
