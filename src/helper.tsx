// pure function to create topic from symbol and depth
export function createDepthTopicFromSymbol(symbol: string, depth: number): string {
  return `${symbol}@depth${depth}`;
}

export function createTickerTopicFromSymbol(symbol: string): string {
  return `${symbol}@ticker`;
}
