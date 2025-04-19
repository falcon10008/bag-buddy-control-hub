
/**
 * Format a status string to display format
 * @param status The raw status string
 * @returns A nicely formatted status string
 */
export function formatStatus(status: string): string {
  return status.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase());
}
