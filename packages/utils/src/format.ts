/**
 * 毫秒转秒
 *
 * @export
 * @param {(number | string)} timestamp
 * @returns {number}
 */
export function formatToSecond(timestamp: number): number {
  return Number((Number(timestamp) / 1000).toFixed(2));
}
