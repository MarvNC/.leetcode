/*
 * @lc app=leetcode id=2070 lang=typescript
 *
 * [2070] Most Beautiful Item for Each Query
 */

// @lc code=start
function maximumBeauty(items: number[][], queries: number[]): number[] {
  // each query is the amount of money to spend, we just find the most beautiful item
  // we can buy for each amount of money

  // First we read items and store prices in a sorted array
  // Then store price as key and beauty in a map

  // When we get a query we binary search the sorted array for the lowest price we can buy

  /** Sorted lowest to highest */
  const prices = items.map(([price, _]) => price).sort((a, b) => a - b);
  /** Stores highest beauty for each price */
  const beautyMap = new Map();
  for (const [price, beautyVal] of items) {
    beautyMap.set(price, Math.max(beautyMap.get(price) || 0, beautyVal));
  }

  // Go thru prices and set highest beauty in map if higher than current highest beauty
  let highestBeauty = 0;
  for (const price of prices) {
    const beauty = beautyMap.get(price);
    if (beauty > highestBeauty) {
      highestBeauty = beauty;
    } else {
      beautyMap.set(price, highestBeauty);
    }
  }

  // Now process queries and return results
  const results: number[] = [];
  for (const query of queries) {
    const index = binarySearchLastAffordable(prices, query);
    results.push(index >= 0 ? beautyMap.get(prices[index]) : 0);
  }
  return results;
}

function binarySearchLastAffordable(prices: number[], target: number): number {
  let left = 0;
  let right = prices.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (prices[mid] <= target) {
      result = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return result;
}
// @lc code=end
