/**
 * 格式化 URL (去掉 https 或 https)
 *
 * @export
 * @param {string} url
 * @returns {string}
 */
export function parseUrl(url: string): string {
  if (!url || typeof url !== 'string') {
    return '';
  }
  return url.replace(/^(https?:)?\/\//, '').replace(/\?.*$/, '');
}

/**
 * 格式化 URL (去掉 https 或 https && 查询参数 ? 后的值)
 *
 * @export
 * @param {string} url
 * @returns {string}
 */
export function parseHash(url: string): string {
  return (url ? parseUrl(url.replace(/^#\/?/, '')) : '') || '[index]';
}
