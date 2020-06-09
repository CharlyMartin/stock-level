export function delay(success, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(success), ms));
}
