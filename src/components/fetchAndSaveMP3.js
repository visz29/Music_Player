async function fetchAndSaveMP3(url) {
  console.log( url);

 const response = await fetch(`http://localhost:3000/api/mp3?url=${encodeURIComponent(url)}`);
  const data = await response.json();
  console.log("MP3 URL from backend:", data.url);
  return data.url;
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // Base64 string
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export { fetchAndSaveMP3 , blobToBase64}