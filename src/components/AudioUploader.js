import { useState } from "react";
import { transcribeAudio } from "../helpers/transcriptionHelper";

function AudioUploader({ setTranscription }) {
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
    setAudioUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    try {
      const transcription = await transcribeAudio(audioFile);
      setTranscription(transcription);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!audioFile}>
        Upload
      </button>
      {audioUrl && (
        <div>
          <audio controls>
            <source src={audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}

export default AudioUploader;
