export async function sendR(response) {
  const dataToSend = {
    result: response,
    timestamp: new Date().toISOString(),
  };
  const postResponse = await fetch("http://localhost:65535/write", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  });
}
