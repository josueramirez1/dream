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
      "https://incredible-cat-d6cc49.netlify.app/",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});
const port = 3000;

//get will serve the html css side

//post will initialized image generator

app.post("/dream", async (req, res) => {
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
  console.log(`Server listening... `);
});
