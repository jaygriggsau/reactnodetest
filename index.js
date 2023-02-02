const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const { Configuration, OpenAIApi } = require("openai");

var cors = require('cors')

require('dotenv').config({path: __dirname + '/.env'})

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use(cors())
  
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" + process.env.OPEN_AI_API_KEY});
});
/////


/////

app.post('/api/openai', async (req, res) => {
    try {
      const configuration = new Configuration({
        apiKey: process.env.OPEN_AI_API_KEY,
      });

      
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Write 3 names for a boy:",
        temperature: 0,
        max_tokens: 400,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],
      });
        return res.json({success: true, data: response.data.choices[0].text});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})
  
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });