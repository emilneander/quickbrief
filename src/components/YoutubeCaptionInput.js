import { useState } from "react";
import useYoutubeCaption from "../hooks/useYoutubeCaption";

export default function YoutubeCaptionInput() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const caption = useYoutubeCaption(url);

  const handleGetCaption = async () => {
    if (!url) {
      setError("Please enter a YouTube URL.");
      return;
    }

    try {
      await caption.fetchCaption();
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <label htmlFor="url">YouTube URL:</label>
      <input
        type="text"
        id="url"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
      />
      <button onClick={handleGetCaption}>Get Caption</button>

      {caption.isLoading ? (
        <div>Loading...</div>
      ) : caption.error ? (
        <div>{caption.error}</div>
      ) : caption.text ? (
        <div>{caption.text}</div>
      ) : (
        <div id="player"></div>
      )}
    </div>
  );
}
