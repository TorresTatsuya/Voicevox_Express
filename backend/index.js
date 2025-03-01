const express = require("express");
const app = express();
const voicevoxApi = require("./services/voicevoxAPI");
const cors = require("cors");

const port = process.env.EXPRESS_PORT;

const corsOpt = {
  origin: "http://localhost:3000"
}

app.use(express.json());
app.use(cors(corsOpt))

app.post("/synthesize", async (req, res) => {
  try {
    const voiceText = req.body.text;
    const speakerID = req.body.speaker;
    const audiodata = await voicevoxApi(voiceText, speakerID)
    res.status(200).send(audiodata);
  } catch (error) {
    res.status(500).send("error");
  }
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})