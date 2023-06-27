export async function transcribeAudio(audioFile) {
  try {
    const signedUrlResponse = await fetch("/api/getSignedUrl");
    const { signedUrl } = await signedUrlResponse.json();

    const response = await fetch(signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "audio/wav",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      body: audioFile,
    });

    if (response.ok) {
      console.log(response.body);
      // The file was uploaded successfully
      console.log("File uploaded successfully!");
      const audioTranscriptionResponse = await fetch("/api/transcribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signedUrl }),
      });

      const { transcription } = await audioTranscriptionResponse.json();
      console.log(transcription);
      return transcription;
    } else {
      console.error("File upload failed!");
    }
  } catch (error) {
    console.error(error);
  }
}
