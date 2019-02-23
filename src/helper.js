// pure function to create topic from symbol and depth
export function createDepthTopicFromSymbol(symbol, depth) {
  return `${symbol}@depth${depth}`
}

export function createTickerTopicFromSymbol(symbol) {
  return `${symbol}@ticker`
}
