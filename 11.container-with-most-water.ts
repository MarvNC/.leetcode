/*
 * @lc app=leetcode id=11 lang=typescript
 *
 * [11] Container With Most Water
 */

// @lc code=start
function maxArea(height: number[]): number {
  if (height.length == 0) {
    return 0;
  }
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;
  while (right > left) {
    let area = Math.min(height[left], height[right]) * (right - left);
    maxWater = Math.max(maxWater, area);

    if (height[left] > height[right]) {
      right--;
    } else {
      left++;
    }
  }
  return maxWater;
}
// @lc code=end
