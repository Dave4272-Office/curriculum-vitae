/** In-place Fisher–Yates on a copy. Does not mutate `items`. */
export function shuffle<T>(items: readonly T[]): T[] {
  const next = [...items];
  const buf = new Uint32Array(1);
  for (let i = next.length - 1; i > 0; i -= 1) {
    crypto.getRandomValues(buf);
    const j = (buf[0] ?? 0) % (i + 1);
    const atI = next[i];
    const atJ = next[j];
    if (atI === undefined || atJ === undefined) {
      continue;
    }
    next[i] = atJ;
    next[j] = atI;
  }
  return next;
}
