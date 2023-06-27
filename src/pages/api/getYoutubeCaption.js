import { google } from "googleapis";

// Replace with your YouTube Data API key
const API_KEY = "AIzaSyAEnOXecBfBMBCNDewASCnuyQHsU_trArI";

export default async function handler(req, res) {
  const { url } = req.body;

  // Extract the video ID from the YouTube URL
  const videoId = url.match(/(?<=v=)[^&\s]*/)[0];

  const auth = new google.auth.GoogleAuth({
    key: API_KEY,
    scopes: ["https://www.googleapis.com/auth/youtube.force-ssl"],
  });

  const youtube = google.youtube({
    version: "v3",
    auth,
  });

  try {
    const captionsResponse = await youtube.captions.list({
      videoId,
      part: "id,snippet",
    });

    const captionTracks = captionsResponse.data.items;

    // Check if the video has automatic captions
    const automaticCaptionTrack = captionTracks.find(
      (track) => track.snippet.trackKind === "asr"
    );

    if (automaticCaptionTrack) {
      // If the video has automatic captions, download the captions
      const captionsDownloadResponse = await youtube.captions.download({
        id: automaticCaptionTrack.id,
        tfmt: "srt",
      });

      const captions = captionsDownloadResponse.data;

      // Split the captions by newline characters and remove timestamps and HTML tags
      const transcription = captions
        .split("\n")
        .map((line) =>
          line
            .replace(
              /(<[^>]+>)|\d+:\d+:\d+.\d+,?\d*\s-->\s\d+:\d+:\d+.\d+,?\d*/,
              ""
            )
            .trim()
        )
        .join(" ");

      res.status(200).json({ captions: transcription });
    } else {
      // If the video does not have automatic captions, show an error message
      res
        .status(400)
        .json({ error: "This video does not have automatic captions." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving captions" });
  }
}
