import React from "react";
import styles from "./TranscriptionViewer.module.css";

const WordListItem = ({ word }) => {
  return (
    <li
      key={word.startTime.seconds + word.startTime.nanos / 1e6}
      className={styles.word}
    >
      <span className={styles.label}>Word:</span>
      {word.word}
      <br />
      <span className={styles.label}>Start Time:</span>
      {`${word.startTime.seconds}.${word.startTime.nanos
        .toString()
        .padStart(6, "0")}s`}
      <br />
      <span className={styles.label}>End Time:</span>
      {`${word.endTime.seconds}.${word.endTime.nanos
        .toString()
        .padStart(6, "0")}s`}
    </li>
  );
};

export default WordListItem;
