import formidable from "formidable-serverless";
import fs from "fs";
import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  
  form.parse(req, async (err, fields, files) => {
    const imagePath = files.image.path;
    const imageBytes = fs.readFileSync(imagePath);

    // 🔥 Aqui usamos IA para reconhecer o alimento
    const ai = await fetch("https://api.openai.com/v1/images/analysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer SUA_CHAVE_OPENAI"
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        task: "food_recognition",
        image: imageBytes.toString("base64")
      })
    });

    const data = await ai.json();
    const alimento = data.result.food;
    const calorias = data.result.calories;

    res.status(200).json({
      food: alimento,
      calories: calorias
    });
  });
}
