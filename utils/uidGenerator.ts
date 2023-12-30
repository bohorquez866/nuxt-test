export function generateUUID(): string {
  const chars = "0123456789abcdef";
  let uuid = "";
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += "-";
    } else {
      const randomIndex = Math.floor(Math.random() * 16);
      uuid += chars.charAt(randomIndex);
    }
  }
  return uuid;
}
