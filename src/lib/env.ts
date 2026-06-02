/**
 * Tiny env-var helper. Read secrets through this so every task validates the same way and we never
 * silently run with a missing key. Never log the returned values.
 */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `${name} is not set. Add it to .env locally AND to the Trigger.dev dashboard (staging + prod).`,
    );
  }
  return value;
}

export function optionalEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}
