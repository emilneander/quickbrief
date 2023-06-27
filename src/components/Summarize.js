import React, { useState } from "react";
import styles from "./Summarize.module.css";
import { summarizeText } from "@/helpers/summarizeHelper";

function Summarize({ transcription }) {
  const [maxWords, setMaxWords] = useState(10);
  const [summarizedText, setSummarizedText] = useState("");

  const handleSummarizeText = async () => {
    if (transcription && transcription.length > 0) {
      setSummarizedText(await summarizeText(transcription, maxWords));
    }
  };

  return (
    <div className={styles.container}>
      <label htmlFor="numSentences" className={styles.label}>
        Max words:
      </label>
      <input
        type="number"
        id="numSentences"
        value={maxWords}
        onChange={(e) => setMaxWords(parseInt(e.target.value))}
        min="1"
        max="100"
        className={styles.input}
      />
      <button onClick={handleSummarizeText} className={styles.button}>
        Summarize audio
      </button>
      {summarizedText && (
        <>
          <h2>Summary:</h2>
          <p className={styles.summary}>{summarizedText}</p>
        </>
      )}
    </div>
  );
}

export default Summarize;
