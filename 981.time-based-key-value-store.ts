/*
 * @lc app=leetcode id=981 lang=typescript
 *
 * [981] Time Based Key-Value Store
 */

// @lc code=start
class TimeMap {
  store: Record<
    string,
    {
      values: Record<number, string>;
      timestamps: number[];
    }
  > = {};

  constructor() {}

  set(key: string, value: string, timestamp: number): void {
    this.store[key] ??= { values: {}, timestamps: [] };
    const entry = this.store[key];
    // add timestamp to reverse sorted arr if not already there
    if (!entry.values[timestamp]) {
      entry.timestamps.splice(
        this.binarySearch(entry.timestamps, timestamp),
        0,
        timestamp
      );
    }
    entry.values[timestamp] = value;
  }

  /**
   * Returns a value such that `set` was called previously, with
   * `timestamp_prev <= timestamp`.
   * If there are multiple such values, it returns the value associated with the
   * largest `timestamp_prev`. If there are no values, it returns `""`.
   * @param key
   * @param timestamp
   */
  get(key: string, timestamp: number): string {
    const entry = this.store[key];
    if (!entry) return "";
    if (entry.values[timestamp]) return entry.values[timestamp];

    const index = this.binarySearch(entry.timestamps, timestamp);
    const lowerTime = entry.timestamps[index - 1];

    return entry.values[lowerTime] ?? "";
  }

  /**
   * Find the location to insert the num
   */
  binarySearch(timestamps: number[], target: number) {
    let low = 0;
    let high = timestamps.length;
    while (low < high) {
      const mid = Math.floor((high + low) / 2);
      if (timestamps[mid] <= target) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low;
  }
}

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */
// @lc code=end
