export async function getCaption(url) {
  const response = await fetch("/api/getYoutubeCaption", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error("Error retrieving caption");
  }

  const { caption } = await response.json();

  return caption;
}
