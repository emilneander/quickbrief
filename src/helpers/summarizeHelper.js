export async function summarizeText(text, maxWords) {
  const API_KEY = "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";
  const MODEL = "text-davinci-002";
  const url = "https://api.openai.com/v1/completions";

  const data = {
    prompt: `Briefly summarize ${text}. What are the most important points to remember?`,
    model: MODEL,
    temperature: 0.5,
    max_tokens: maxWords,
    n: 1,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options);
  const result = await response.json();

  console.log(result);
  const summary = result.choices[0].text;
  return summary;
}
