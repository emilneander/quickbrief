import React from "react";
import styles from "./TranscriptionViewer.module.css";
import WordListItem from "./WordListItem";

const TranscriptionViewer = ({ transcription }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Transcription:</h2>
      {transcription.length ? (
        <div className={styles.result}>
          <p className={styles.transcript}>{transcription}</p>
          {/* <ul className={styles.wordsList}>
              {result.words.map((word) => (
                <WordListItem word={word} />
              ))}
            </ul> */}
        </div>
      ) : (
        <p className={styles.noResults}>No transcription results available.</p>
      )}
    </div>
  );
};

export default TranscriptionViewer;
