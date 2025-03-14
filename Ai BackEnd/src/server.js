import express from "express";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import {} from 
import bodyParser from "body-parser";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// CORS Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Dummy chat history for DELETE operation
let chatHistory = [];

// LangChain
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const llm = new ChatGoogleGenerativeAI({
  apiKey: GEMINI_API_KEY,
  modelName: "gemini-2.0-flash",
});


// Get chat history (for testing DELETE functionality)
app.get('/chat/history', (req, res) => {
  res.json(chatHistory);
});



// POST Route: Handle streaming response
app.post('/chat', async (req, res) => {
  const userMessage = req.body.question;

  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const AiAnswer = await llm.invoke(userMessage);

    const responseText = AiAnswer.content;

    // Break response into natural chunks (sentences)
    const chunks = responseText.match(/[^.!?]+[.!?]+|[^.!?]+/g);

    if (chunks) {
      for (const chunk of chunks) {
        res.write(`${chunk.trim()}\n`);
        await new Promise(resolve => setTimeout(resolve, 300)); // Slight delay for smoothness
      }
    }

    res.end(); // End the streaming response

  } catch (error) {
    res.write(`Error: Failed to get response from AI. ${error.message}\n`);
    res.end();
  }
});



// DELETE Route: Clear chat history
app.delete('/chat/history', (req, res) => {
  chatHistory = [];
  res.json({ message: 'Chat history cleared' });
});






// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});