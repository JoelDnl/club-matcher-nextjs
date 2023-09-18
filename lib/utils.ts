export function cosineSimilarity(arrayA: number[], arrayB: number[]) {
  let dotProduct = 0,
    mA = 0,
    mB = 0;

  for (let i = 0; i < arrayA.length; i++) {
    dotProduct += arrayA[i] * arrayB[i];
    mA += arrayA[i] * arrayB[i];
    mB += arrayB[i] * arrayB[i];
  }

  mA = Math.sqrt(mA);
  mB = Math.sqrt(mB);

  return dotProduct / (mA * mB);
}

// Borrowed from freeCodeCamp
export function isValidHttpUrl(str: string) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );
  return pattern.test(str);
}

export function getDomainURL(str: string) {
  console.log(new URL(str).hostname);
  return new URL(str).hostname;
}
