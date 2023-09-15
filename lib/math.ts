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
