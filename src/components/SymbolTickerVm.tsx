import { computed } from "mobx";
import { createTickerTopicFromSymbol } from "../helper";
import { WebSocketState } from "../states";
import { SymbolTickerProps } from "./SymbolTicker";

export default class SymbolTickerVm {
  private webSocketState: WebSocketState;
  public readonly symbol: string;

  constructor(init: SymbolTickerProps) {
    Object.assign(this, init);
  }

  @computed
  get topic() {
    return createTickerTopicFromSymbol(this.symbol);
  }

  @computed
  get stream(): MarketData.Ticker | undefined {
    return this.webSocketState.streams.get(this.topic) as MarketData.Ticker;
  }

  @computed
  get priceChangePercentage() {
    const { stream } = this;
    if (stream === undefined) return "";
    if (stream.P === undefined) return "";
    return Number(stream.P) > 0 ? `+${stream.P}%` : `${stream.P}%`;
  }

  @computed
  get stats() {
    const { stream } = this;
    if (stream === undefined) return [];
    return [
      { label: "Open", value: stream.o },
      { label: "High", value: stream.h },
      { label: "Low", value: stream.l },
      { label: "Close", value: stream.c },
      { label: "Volume", value: stream.v },
      { label: "Best bid", value: stream.b },
      { label: "Best ask", value: stream.a },
      { label: "Total Trades", value: stream.n },
      { label: "Price Change over 24hr", value: this.priceChangePercentage }
    ];
  }
}
