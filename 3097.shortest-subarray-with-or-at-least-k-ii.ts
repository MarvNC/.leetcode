/*
 * @lc app=leetcode id=3097 lang=typescript
 *
 * [3097] Shortest Subarray With OR at Least K II
 */

// @lc code=start
function minimumSubarrayLength(nums: number[], k: number): number {
  let shortest = Number.MAX_VALUE,
    left = 0,
    right = 0,
    orSum = 0,
    /** Amount of bits at each pos */
    bitCount = new Array(32).fill(0);

  while (right < nums.length) {
    orSum |= nums[right];
    // Add 1 to bitcount
    let num = nums[right];
    let bitIndex = 0;
    while (num > 0) {
      bitCount[bitIndex] += num & 1;
      num >>>= 1;
      bitIndex++;
    }

    // if sum above k move left pointer right to constrain
    while (orSum >= k && left <= right) {
      shortest = Math.min(shortest, right - left + 1);

      // remove bits from num at left pointer and recalculate orSum
      num = nums[left];
      bitIndex = 0;
      while (num > 0) {
        bitCount[bitIndex] -= num & 1;
        // If that bit is now 0
        if (bitCount[bitIndex] === 0) {
          orSum &= ~(1 << bitIndex);
        }
        num >>>= 1;
        bitIndex++;
      }
      left++;
    }

    right++;
  }
  return shortest === Number.MAX_VALUE ? -1 : shortest;
}

// @lc code=end
