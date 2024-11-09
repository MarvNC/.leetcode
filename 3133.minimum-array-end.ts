/*
 * @lc app=leetcode id=3133 lang=typescript
 *
 * [3133] Minimum Array End
 */

// @lc code=start
function minEnd(n: number, x: number): number {
  // We realize that every single element in the array must start out
  // already having the bits for being AND with x
  // So we can simply start with x and keep going up?
  // basically just get n-1 in bit form, then add to x bitwise without changing any existing 1's to 0
  // Ex. n = 2, x = 7, 7 -> 15 (111 -> 1111 as 111 + 1 = 1000 so it fails so we add the 1)
  // n = 3, x = 4, 4 -> 6 (100 -> 110 as 100 + 10 didnt overlap)

  let result = BigInt(x);
  let bitsToAddToZeros = BigInt(n - 1);
  let i = BigInt(0);
  // Loop thru bits in order from right to left, add bits only when it's 0 in x
  while (bitsToAddToZeros > 0) {
    const maskAtI = BigInt(1) << i;
    const xAtI = BigInt(x) & maskAtI;

    // if x is 1 at that bit, skip
    if (!xAtI) {
      const bitToAdd = bitsToAddToZeros & BigInt(1);
      // set x at that bit if 0
      result |= bitToAdd << i;
      bitsToAddToZeros >>= BigInt(1);
    }

    i++;
  }

  return Number(result);
}
// @lc code=end
