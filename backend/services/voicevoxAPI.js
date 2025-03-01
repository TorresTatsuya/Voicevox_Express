const fs = require("fs");
const axios = require("axios");
const voicevoxURL = process.env.VOICEVOX_URL;

const generateAudioFile = async (voiceText, speakerID) => {
  try {
    const queryJson = await requestQueryJsonData(voiceText, speakerID);
    const audioData = await requestAudioData(queryJson, speakerID);
    console.log('音声ファイルが生成されました');
    return audioData;
  } catch (error) {
    console.log('音声ファイルが生成に失敗しました', error);
    
  }
}

const requestQueryJsonData = async (voiceText, speakerID) => {
  try {
    const params = new URLSearchParams({
      text: voiceText,
      speaker: speakerID
    });

    const response = await axios({
      method: "post",
      url: `${voicevoxURL}/audio_query?${params.toString()}`
    });

    return JSON.stringify(response.data);
  } catch (error) {
    console.log(error);
  }
}

const requestAudioData = async (queryJson, speakerID) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${voicevoxURL}/synthesis`,
      params: {
        speaker: speakerID
      },
      headers: {
        'Content-Type': 'application/json'
      },
      data: queryJson,
      responseType: 'arraybuffer'
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

module.exports = generateAudioFile;