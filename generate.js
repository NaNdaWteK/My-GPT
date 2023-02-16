const { Configuration, OpenAIApi } = require("openai")
require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

(async function () {
  if (!configuration.apiKey) {
    console.log("OpenAI API key not configured, please follow instructions in README.md")
  }

  try { 
    var readline = require('readline');
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    var recursiveAsyncReadLine =  function () {
      rl.question(`Que quieres saber? `, async (question) => {
        if (question === 'exit')
          return rl.close();
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: question,
          temperature: 0.6,
          max_tokens: 3000
        });
        log(completion.data.choices[0].text + '\n')
        recursiveAsyncReadLine();
      });
    };

    recursiveAsyncReadLine();
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
})()

const log = (text, color = Assert.fg.green) => {
  console.log(`${color}%s${Assert.reset}`, text);
};
const Assert = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  // Foreground (text) colors
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m',
  },
  // Background colors
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m',
  },
};
