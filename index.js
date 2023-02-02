const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const { Configuration, OpenAIApi } = require("openai");

var cors = require('cors')

require('dotenv').config({path: __dirname + '/.env'})

const PORT = process.env.PORT || 3001;
const apiKey = "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";

const app = express();
app.use(bodyParser.json());
app.use(cors())
  
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
/////


/////

app.post('/api/openai', async (req, res) => {
    try {
      const configuration = new Configuration({
        apiKey,
      });

      
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"Unknown\".\n\nQ: What is human life expectancy in the United States?\nA: Human life expectancy in the United States is 78 years.\n\nQ: Who was president of the United States in 1955?\nA: Dwight D. Eisenhower was president of the United States in 1955.\n\nQ: Which party did he belong to?\nA: He belonged to the Republican Party.\n\nQ: What is the square root of banana?\nA: Unknown\n\nQ: How does a telescope work?\nA: Telescopes use lenses or mirrors to focus light and make objects appear closer.\n\nQ: Where were the 1992 Olympics held?\nA: The 1992 Olympics were held in Barcelona, Spain.\n\nQ: How many squigs are in a bonk?\nA: Unknown\n\nQ: Where is the Valley of Kings?\nA:",
        temperature: 0,
        max_tokens: 100,
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