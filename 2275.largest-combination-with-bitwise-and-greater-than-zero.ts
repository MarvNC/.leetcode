/*
 * @lc app=leetcode id=2275 lang=typescript
 *
 * [2275] Largest Combination With Bitwise AND Greater Than Zero
 */

// @lc code=start
function largestCombination(candidates: number[]): number {
  // we can think of all the numbers as a giant table of 1's and 0's
  // and we want to find the column with the most 1's so it's nonzero
  const bitCount = 24;
  /** Stores the amount of 1's at that bit */
  const bits: number[] = new Array(bitCount).fill(0);

  // shift each num to the right and take each bit into arr
  for (let num of candidates) {
    for (let i = 0; i < bitCount; i++) {
      bits[i] += num & 1;
      num >>>= 1;
    }
  }

  return Math.max(...bits);
}
// @lc code=end
