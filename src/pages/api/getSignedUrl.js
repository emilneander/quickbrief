import { Storage } from "@google-cloud/storage";

export default async (req, res) => {
  const storage = new Storage();
  const bucketName = "quickbrief-audio-files";
  const fileName = `test.wav`;
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(fileName);
  const signedUrlsResponse = await file.getSignedUrl({
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType: "audio/wav",
  });
  console.log(signedUrlsResponse[0]);
  const signedUrl = signedUrlsResponse[0];
  res.status(200).json({ signedUrl });
};
