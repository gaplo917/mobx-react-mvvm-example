// pure function to create topic from symbol and depth
export function createDepthTopicFromSymbol(symbol: string, depth: number): string {
  return `${symbol}@depth${depth}`;
}

export function createTickerTopicFromSymbol(symbol: string): string {
  return `${symbol}@ticker`;
}

export function isTicker(msg: MarketData.Message): msg is MarketData.Ticker {
  return ('e' && 'E' && 's' && 'p' && 'P' && 'w' && 'x' && 'c' && 'Q' && 'b' && 'B' && 'a' && 'A' && 'o' && 'h' && 'l' && 'v' && 'q' && 'O' && 'C' && 'F' && 'L' && 'n') in msg;
}

export function isOrderBookDepth(msg: MarketData.Message): msg is MarketData.OrderBookDepth {
  return ('bids' && 'asks' && 'lastUpdateId') in msg;
}