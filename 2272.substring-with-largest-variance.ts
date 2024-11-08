/*
 * @lc app=leetcode id=2272 lang=typescript
 *
 * [2272] Substring With Largest Variance
 */

// @lc code=start
function largestVariance(s: string): number {
  // 2d arr with row being bigger and col being smaller char
  // Then we just do 26*26 max subarr problems
  const counts: number[] = new Array(26).fill(0);

  // Convert string to arr indices
  const aCharCode = "a".charCodeAt(0);

  const codes = s.split("").map((char) => {
    const code = char.charCodeAt(0) - aCharCode;
    counts[code]++;
    return code;
  });

  let largest = 0;
  // console.log(codes);

  for (let biggerCode = 0; biggerCode < 26; biggerCode++) {
    for (let smallerCode = 0; smallerCode < 26; smallerCode++) {
      let biggerCount = 0,
        smallerCount = 0,
        variance = 0,
        remainingSmaller = counts[smallerCode];
      // We only care about when biggerCount larger than smallerCount.
      // There is the opposite side across the diagonal for the opposite case.
      for (let i = 0; i < codes.length; i++) {
        const code = codes[i];

        if (biggerCount - smallerCount < 0 && remainingSmaller > 0) {
          biggerCount = smallerCount = 0;
        }

        if (code === biggerCode) {
          biggerCount++;
        } else if (code === smallerCode) {
          smallerCount++;
          remainingSmaller--;
        }
        // One of the two is zero
        if (!biggerCount || !smallerCount) continue;

        const diff = biggerCount - smallerCount;
        if (biggerCode === 0 && smallerCode === 15)
          console.log(i, biggerCode, smallerCode, "update", diff);
        if (diff > variance) {
          variance = diff;
        }
      }

      largest = Math.max(variance, largest);
    }
  }

  return largest;
}
// @lc code=end
