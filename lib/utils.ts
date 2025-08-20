// Weights for Q1..Q8 (sum ≈ 1). Tweak as you like.
export const QUIZ_WEIGHTS: number[] = [0.15, 0.35, 0.10, 0.15, 0.03, 0.07, 0.05, 0.10];

// Clamp helper
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

/** Plain cosine similarity. Returns 0..1 for non-negative inputs. */
export function cosineSimilarity(a: unknown[], b: unknown[]) {
  if (!Array.isArray(a) || !Array.isArray(b)) return 0;
  const n = Math.min(a.length, b.length);
  if (n === 0) return 0;

  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < n; i++) {
    const x = Number(a[i]);
    const y = Number(b[i]);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    dot += x * y;
    na += x * x;
    nb += y * y;
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  return clamp01(denom ? dot / denom : 0);
}

/** Weighted cosine similarity using weights per question. */
export function cosineSimilarityWeighted(a: unknown[], b: unknown[], w: number[] = QUIZ_WEIGHTS) {
  if (!Array.isArray(a) || !Array.isArray(b) || !Array.isArray(w)) return 0;
  const n = Math.min(a.length, b.length, w.length);
  if (n === 0) return 0;

  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < n; i++) {
    const x = Number(a[i]) * Number(w[i]);
    const y = Number(b[i]) * Number(w[i]);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    dot += x * y;
    na += x * x;
    nb += y * y;
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  return clamp01(denom ? dot / denom : 0);
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
  return new URL(str).hostname;
}
