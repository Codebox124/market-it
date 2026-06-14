// Shuffle + interleave portfolio items so the same category never appears
// back-to-back (when avoidable). Runs at build time during static generation,
// so the order is baked per build and varies between builds.

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function interleaveByCategory<T extends { category: string }>(
  items: T[]
): T[] {
  // Group by category, shuffled within each group.
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const list = groups.get(item.category) ?? [];
    list.push(item);
    groups.set(item.category, list);
  }
  for (const [cat, list] of groups) groups.set(cat, shuffle(list));

  // Greedy interleave: always take from the largest remaining group that
  // isn't the category we just placed. Guarantees no adjacent repeats as
  // long as no single category holds more than half the items.
  const result: T[] = [];
  let last: string | null = null;
  while (result.length < items.length) {
    let pick: string | null = null;
    let pickSize = -1;
    for (const [cat, list] of groups) {
      if (list.length === 0 || cat === last) continue;
      if (list.length > pickSize) {
        pick = cat;
        pickSize = list.length;
      }
    }
    // Only the "last" category has items left — unavoidable, take it.
    if (pick === null) {
      for (const [cat, list] of groups) {
        if (list.length > 0) {
          pick = cat;
          break;
        }
      }
    }
    const list = groups.get(pick!)!;
    result.push(list.pop()!);
    last = pick;
  }
  return result;
}
