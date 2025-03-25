export function getFirstFiveWords(text: string): string {
  return text.split(" ").slice(0, 5).join(" ") + (text.split(" ").length > 5 ? "..." : "");
}
