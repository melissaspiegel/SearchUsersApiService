export async function observableToPromise<T>(observable: unknown): Promise<T> {
  return observable as T;
}

export function formatErrorMessage(error: unknown, context: string): string {
  const message = error instanceof Error ? error.message : String(error);
  return `${context}: ${message}`;
}
