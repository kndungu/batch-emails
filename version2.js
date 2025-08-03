class Queue {
  constructor(maxIndex) {
    const indexes = []
    
    for (let i = 0; i <= maxIndex; i++) {
      indexes.push(i)
    }

    this.items = indexes
  }

  enqueue(item) {
    this.items.push(item)
  }

  dequeue() {
    return this.items.shift()
  }

  peek() {
    return this.items[0]
  }

  rotate() {
    const item = this.dequeue()

    this.enqueue(item)
  }
}

export const buildBatches = (samples) => {
    const map = {}

    for (const sample of samples) {
      map[sample.email] = map[sample.email] === undefined
        ? 1
        : map[sample.email] + 1
    }

    const max = Math.max(...Object.values(map));
    const batches = Array.from({ length: max }, () => [])

    const batchIndexesQueue = new Queue(max - 1);

    for (const sample of samples) {
      let nextBatchIndex = batchIndexesQueue.peek();
      let nextBatchContainsEmail = batches[nextBatchIndex].some(
        ({ email }) => email === sample.email
      )

      while (nextBatchContainsEmail) {
        batchIndexesQueue.rotate()

        nextBatchIndex = batchIndexesQueue.peek();

        nextBatchContainsEmail = batches[nextBatchIndex].some(({ email }) => email === sample.email );
      }

      batches[nextBatchIndex].push(sample);
      batchIndexesQueue.rotate()
    }

    return batches;
}
