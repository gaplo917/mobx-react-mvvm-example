
declare namespace Binance {
  // https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md
  interface Quote {
    price: string // Price level to be updated
    qty: string // Quantity
  }

  export interface OrderBookDepth {
    lastUpdateId: number,  // Last update ID
    bids: Array<Quote[]>,
    asks: Array<Quote[]>
  }

  export interface Ticker {
    e: string  // Event type
    E: number  // Event time
    s: string  // Symbol
    p: string  // Price change
    P: string  // Price change percent
    w: string  // Weighted average price
    x: string  // First trade(F)-1 price (first trade before the 24hr rolling window)
    c: string  // Last price
    Q: string  // Last quantity
    b: string  // Best bid price
    B: string  // Best bid quantity
    a: string  // Best ask price
    A: string  // Best ask quantity
    o: string  // Open price
    h: string  // High price
    l: string  // Low price
    v: string  // Total traded base asset volume
    q: string  // Total traded quote asset volume
    O: number  // Statistics open time
    C: number  // Statistics close time
    F: number  // First trade ID
    L: number  // Last trade Id
    n: number  // Total number of trades
  }

  export interface RawMessage {
    stream: string
    data: string
  }

  export type Message = OrderBookDepth | Ticker
}

declare namespace MarketData {
  export interface OrderBookDepth extends Binance.OrderBookDepth {}
  export interface Ticker extends Binance.Ticker {}
  export interface RawMessage extends Binance.RawMessage {}
  export type Message = Binance.Message
}