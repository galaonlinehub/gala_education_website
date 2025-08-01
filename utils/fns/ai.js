import CryptoJS from 'crypto-js'

export const fetchWithStream = async (token,question, onChunk) => {
  const response = await fetch("http://localhost:8000/ask-gala-stream", {
    method: "POST",
    body: JSON.stringify({ question }),
    headers: { "Content-Type": "application/json",Authorization:`Bearer ${token}` }
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder("utf-8");

  if (!reader) return;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    onChunk(chunk);
  }
};

export function generateRandomUUID() {
    const randomBytes = CryptoJS.lib.WordArray.random(5); 
    return randomBytes.toString(CryptoJS.enc.Hex).toUpperCase();
}


