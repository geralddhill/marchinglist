/**
 * Formats show duration into mm:ss format
 * @param {number} totalSeconds - Total duration of the show in seconds
 * @throws RangeError If totalSeconds is negative
 * @throws RangeError If totalSeconds is longer than one hour
 * @returns {string} Duration as string formatted as mm:ss
 */
export function formatDuration(totalSeconds: number): string {
  if (totalSeconds < 0) {
    throw new RangeError("totalSeconds must be greater than 0");
  }
  if (totalSeconds >= 3600) {
    throw new RangeError("Shows cannot be longer than one hour.");
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

/**
 * Formats show duration into ISO string for datetime attribute
 * @param {number} totalSeconds - Total duration of the show in seconds
 * @throws RangeError If totalSeconds is negative
 * @throws RangeError If totalSeconds is longer than one hour
 * @returns {string} Duration as ISO string
 */
export function secondsToISO(totalSeconds: number): string {
  if (totalSeconds < 0) {
    throw new RangeError("totalSeconds must be greater than 0");
  }
  if (totalSeconds >= 3600) {
    throw new RangeError("Shows cannot be longer than one hour.");
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `PT0H${minutes}M${seconds}S`;
}

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/**
 * Formats price into local currency without cents
 * @param {number} price - Price in US dollars
 * @throws RangeError If price is negative
 * @returns {string} Price as local currency string without cents
 */
export function formatPrice(price: number): string {
  if (price < 0) {
    throw new RangeError("Amount must be greater than 0");
  }
  return priceFormatter.format(price);
}
