import { Storage } from "@google-cloud/storage";
import speech from "@google-cloud/speech";
import { WaveFile } from "wavefile";

export default async (req, res) => {
  try {
    const keyFilename =
      "C:/Users/EmilNeander/Downloads/quickbrief-8fbccb3eb474.json";
    const storage = new Storage({ keyFilename });
    const bucketName = "quickbrief-audio-files";
    const fileName = "test.wav";
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    // Download and decode the audio file
    const fileData = await file.download();
    const audioData = fileData[0];
    const wav = new WaveFile(audioData);

    // Convert to mono if necessary
    if (wav.fmt.numChannels !== 1) {
      console.log(wav.fmt.numChannels);
      //   wav.toMono();
    }

    // Calculate chunk size and duration
    const chunkSize = 4.9 * 1024 * 1024; // 9.9 MB
    const chunkDuration = 0.59; // 59 seconds

    const numChunks = Math.ceil(audioData.length / chunkSize);
    const chunks = [];

    // Split the audio into chunks
    for (let i = 0; i < numChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, audioData.length);
      const duration = chunkDuration * 1000;

      chunks.push({
        data: audioData.slice(start, end),
        duration: duration,
      });
    }

    const client = new speech.SpeechClient();
    const promises = [];

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      // Convert the audio to base64
      const base64AudioData = Buffer.from(chunk.data).toString("base64");

      // Use the base64 audio data for transcription
      const audio = { content: base64AudioData };

      const config = {
        encoding: "LINEAR16",
        sampleRateHertz: wav.fmt.sampleRate,
        languageCode: "en-US",
      };

      const request = {
        audio: audio,
        config: config,
      };

      const promise = client.recognize(request);
      promises.push(promise);

      // Delay before sending the next request to avoid rate limiting
      if (i < chunks.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, chunk.duration));
      }
    }

    const results = await Promise.all(promises);
    const transcription = results
      .map((result) => result[0].results[0].alternatives[0].transcript)
      .join("\n");

    console.log(`Transcription: ${transcription}`);
    res.status(200).json({ transcription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
