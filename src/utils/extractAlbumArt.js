import { parseBlob } from 'music-metadata-browser';

async function extractAlbumArt(file) {
  const metadata = await parseBlob(file);
  const picture = metadata.common.picture?.[0];

  if (picture) {
    const base64String = await convertToBase64(picture.data, picture.format);
    return `data:${picture.format};base64,${base64String}`;
  } else {
    return null; // No image found
  }
}

function convertToBase64(buffer, mimeType) {
  return new Promise((resolve) => {
    const blob = new Blob([buffer], { type: mimeType });
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Data = reader.result.split(',')[1]; // remove the prefix if needed
      resolve(base64Data);
    };

    reader.readAsDataURL(blob);
  });
}

export default extractAlbumArt;

