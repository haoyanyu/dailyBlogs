const  { OpenAI }  = require("langchain/llms/openai");

console.log('>>>> langChain demo <<<<')
const model = new OpenAI({
  openAIApiKey: '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',
  temperature: 0.9
})

const demo = async () => {
  console.log('>>>>>>>> res <<<<<<<<');
  try {
    const res = await model.call("What would be a good company name a company that makes colorful socks?");

    console.log('>>>>>>>> res <<<<<<<<', res);
  } catch (err) {
    console.log('>>>>>>>> err <<<<<<<<', err);
  }
  
}

demo();
