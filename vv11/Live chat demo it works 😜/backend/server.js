// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await axios.post(
      'http://localhost:1234/v1/chat/completions',
      {
        model: "qwen2-math-1.5b-instruct",
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: true
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer lmstudio'
        },
        responseType: 'stream'
      }
    );

    res.setHeader('Content-Type', 'text/plain');

    response.data.on('data', (chunk) => {
      const lines = chunk.toString().split('\n');
      lines.forEach(line => {
        if (line.startsWith('data: ') && line !== 'data: [DONE]') {
          try {
            const data = JSON.parse(line.substring(6));
            if (data.choices[0].delta.content) {
              res.write(data.choices[0].delta.content);
            }
          } catch (e) {
            console.error('Error parsing chunk:', e);
          }
        }
      });
    });

    response.data.on('end', () => {
      res.end();
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});