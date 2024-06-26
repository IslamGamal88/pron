const http = require("http");
const path = require("path");
const express = require("express");
const socketio = require("socket.io");
const parseArgs = require("minimist");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
require("dotenv").config();
const server = http.createServer(app);
const io = socketio(server);
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const args = parseArgs(process.argv.slice(2));
const { name = "default", port = "8080" } = args;

// app.use(express.static(path.join(__dirname, "public")));

const questions = [
  "ما هو سنك ؟",
  "هل انت ذكر ام انثي ؟",
  "كم هو طولك ؟",
  "كم هو وزنك ؟",
  "ماهي الرياضه التي تمارسها ؟",
  "مازال تمارس هذه الرياضه ام معتزل ؟",
  "ماهي الاصابات التي اصبت بها من قبل ؟",
  "هل عالجت هذه الاصابات ام لا ؟",
  "هل يختلف الالم من مكان الي اخر ام يبقي في نفس المكان ؟",
  "اين موضع الالم ؟ هل تشعر بالعمق ام السطحيه ؟",
  "هل الوضع يتحسن ام يسوء ؟",
  "متي تشعر ان الامر يزاد سوءا و متي يتحسن ؟",
  "هل هذه المره الاولي التي تعاني منها ام واجهت شيئا مشابها من قبل ؟",
  "ما هي طبيعه عملك ؟",
];

async function getChatGPTResponse(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

app.get("/api/test", (req, res) => {
  res.json({
    headers: req.headers,
    address: req.connection.remoteAddress,
  });
});

app.get("/api/name", (req, res) => {
  res.json({ name });
});

app.get("/api/info", (req, res) => {
  fs.readFile(`${__dirname}/version.txt`, "utf8", (err, version) => {
    res.json({
      version: version || 0,
      dirname: __dirname,
      cwd: process.cwd(),
    });
  });
});

io.on("connection", (socket) => {
  console.log("Client connected");
  let currentQuestionIndex = 0;
  let chat = [];

  // Send a "connected!" message to the client
  socket.emit("message", "connected!");

  // Start asking the first question
  socket.emit("question", questions[currentQuestionIndex]);

  socket.on("answer", (answer) => {
    chat.push(questions[currentQuestionIndex]);
    chat.push(answer);

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      socket.emit("question", questions[currentQuestionIndex]);
    } else {
      const prompt = `based on this conversation ${chat.join(
        ", "
      )} what do you think the diagnosis is ? and can you recommend some general purpose exercises ?`;

      getChatGPTResponse(prompt).then((response) => {
        socket.emit("response", response);
      });
    }
  });

  sock.on("disconnect", () => {
    console.log("Socket Disconnected");
  });
});

server.listen(+port, "0.0.0.0", (err) => {
  if (err) {
    console.log(err.stack);
    return;
  }

  console.log(`Node [${name}] listens on http://127.0.0.1:${port}.`);
});
