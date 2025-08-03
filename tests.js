import { strict as assert } from 'assert';
import { buildBatches as buildBatchesV1 } from './version1.js';
import { buildBatches as buildBatchesV2 } from './version2.js';
import { buildBatches as buildBatchesV3 } from './version3.js';

// Helper to count unique emails in a batch
function uniqueEmails(batch) {
  return new Set(batch.map(item => item.email)).size;
}

// Helper to run all tests for a given buildBatches function
function runTests(buildBatches, label) {
  // 1. All unique emails
  const uniqueSamples = [
    { email: 'a@x.com', title: 't', message: 'm' },
    { email: 'b@x.com', title: 't', message: 'm' },
    { email: 'c@x.com', title: 't', message: 'm' }
  ];
  let result = buildBatches(uniqueSamples);
  assert.equal(result.length, 1, `[${label}] Should be 1 batch for all unique emails`);
  assert.equal(result[0].length, uniqueSamples.length, `[${label}] All items in one batch`);
  assert.equal(uniqueEmails(result[0]), uniqueSamples.length, `[${label}] All emails unique in batch`);

  // 2. All same email
  const sameEmailSamples = [
    { email: 'a@x.com', title: 't1', message: 'm1' },
    { email: 'a@x.com', title: 't2', message: 'm2' },
    { email: 'a@x.com', title: 't3', message: 'm3' }
  ];
  result = buildBatches(sameEmailSamples);
  assert.equal(result.length, sameEmailSamples.length, `[${label}] Should be one batch per duplicate`);
  result.forEach(batch => {
    assert.equal(batch.length, 1, `[${label}] Each batch should have one item`);
    assert.equal(uniqueEmails(batch), 1, `[${label}] Each batch should have one unique email`);
  });

  // 3. Mixed duplicates
  const mixedSamples = [
    { email: 'a@x.com', title: 't', message: 'm' },
    { email: 'b@x.com', title: 't', message: 'm' },
    { email: 'a@x.com', title: 't', message: 'm' },
    { email: 'c@x.com', title: 't', message: 'm' },
    { email: 'b@x.com', title: 't', message: 'm' }
  ];
  result = buildBatches(mixedSamples);
  assert.equal(result.length, 2, `[${label}] Should be 2 batches for max duplicate count`);
  result.forEach(batch => {
    assert.equal(batch.length, uniqueEmails(batch), `[${label}] No duplicate emails in batch`);
  });
  const allBatched = result.flat();
  assert.equal(allBatched.length, mixedSamples.length, `[${label}] All samples present`);

  // 4. Empty array
  const emptySamples = [];
  result = buildBatches(emptySamples);
  assert.deepEqual(result, [], `[${label}] Empty input should return empty array`);

  // 5. Large batch with 10 duplicates and 40 unique
  const largeSamples = [
    ...Array.from({ length: 40 }, (_, i) => ({
      email: `unique${i}@x.com`,
      title: `Title ${i}`,
      message: `Message ${i}`
    })),
    ...Array.from({ length: 10 }, (_, i) => ({
      email: 'dupe@x.com',
      title: `Dupe Title ${i}`,
      message: `Dupe Message ${i}`
    }))
  ];
  result = buildBatches(largeSamples);
  assert.equal(result.length, 10, `[${label}] Should be 10 batches for max duplicate count`);
  result.forEach(batch => {
    assert.equal(batch.length, uniqueEmails(batch), `[${label}] No duplicate emails in batch`);
  });
  assert.equal(result.flat().length, largeSamples.length, `[${label}] All samples present`);

  // 6. Each batch index is used
  for (let i = 0; i < result.length; i++) {
    assert(result[i], `[${label}] Batch index ${i} should exist`);
  }

  // 7. No sample is lost or duplicated
  const sortedOriginal = largeSamples.map(s => JSON.stringify(s)).sort();
  const sortedBatched = result.flat().map(s => JSON.stringify(s)).sort();
  assert.deepEqual(
    sortedOriginal,
    sortedBatched,
    `[${label}] All samples should be present and not duplicated`
  );

  // 8. Even distribution for duplicated email
  const dupeEmail = 'dupe@x.com';
  const dupeCounts = result.map(batch =>
    batch.filter(item => item.email === dupeEmail).length
  );
  const minCount = Math.min(...dupeCounts);
  const maxCount = Math.max(...dupeCounts);
  assert(
    maxCount - minCount <= 1,
    `[${label}] Dupe email should be evenly distributed, got counts: ${dupeCounts}`
  );
}

runTests(buildBatchesV1, 'V1');
runTests(buildBatchesV2, 'V2');
runTests(buildBatchesV3, 'V3');

console.log('All buildBatches tests passed for both versions.');
