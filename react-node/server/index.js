const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
// import { Configuration, OpenAIApi } from "openai";
const { Configuration, OpenAIApi} = require('openai')

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
  
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post('/api/openai', async (req, res) => {
    try {
        const configuration = new Configuration({
          apiKey: process.env.REACT_APP_YOUR_OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: "Write a long-form piece in the style of belles-lettres about the subject, explore the different schools of thought on subject, share any tactics and strategies on the subject, and other interesting insights around the subject, who are the impactful people related to the subject, and what can we learn from them? The subject is." + subject + "Format in html with paragraph tags. Where possible add curiosity driven headings with H1 between sections.Style of belles-lettres. Format with spaces arund paragraphs and titles",
          temperature: 0.7,
          max_tokens: 2500,
        });
        setResult(response.data.choices[0].text);
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