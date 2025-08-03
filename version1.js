export const buildBatches = (samples) => {
  const map = {}

  for (const sample of samples) {
    map[sample.email] = map[sample.email] === undefined ? 0 : map[sample.email] + 1
  }

  const max = Math.max(...Object.values(map));
  const batches = Array.from({ length: max + 1 }, () => [])

  for (const sample of samples) {
    const index = map[sample.email]

    batches[index].push(sample);
    map[sample.email] = index - 1
  }

  return batches
}

