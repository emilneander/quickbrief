import { summarizeText } from "@/helpers/summarizeHelper";
import { useState } from "react";
import AudioUploader from "../components/AudioUploader";
import TranscriptionViewer from "../components/TranscriptionViewer";
import Summarize from "../components//Summarize";
import YoutubeCaptionInput from "@/components/YoutubeCaptionInput";

function AudioTranscriber() {
  const [transcription, setTranscription] = useState({});
  const [summarizedText, setSummarizedText] = useState("");

  return (
    <div>
      <AudioUploader setTranscription={setTranscription} />
      <YoutubeCaptionInput setTranscription={setTranscription} />
      {transcription ? (
        <>
          <Summarize transcription={transcription} />
          <p>{summarizedText}</p>
          <TranscriptionViewer transcription={transcription} />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default AudioTranscriber;
