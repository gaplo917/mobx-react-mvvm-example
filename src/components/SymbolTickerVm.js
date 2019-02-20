import { computed } from "mobx";
import { createTickerTopicFromSymbol } from "../helper";

export default class SymbolTickerVm {
  constructor({ webSocketState, symbol }) {
    this.webSocketState = webSocketState;
    this.symbol = symbol;
  }

  @computed
  get topic() {
    return createTickerTopicFromSymbol(this.symbol);
  }

  @computed
  get stream() {
    return this.webSocketState.streams.get(this.topic) || {};
  }

  @computed
  get priceChangePercentage() {
    if (this.stream.P === undefined) return "";
    return this.stream.P > 0 ? `+${this.stream.P}%` : `${this.stream.P}%`;
  }

  @computed
  get stats() {
    return [
      { label: "Open", value: this.stream.o },
      { label: "High", value: this.stream.h },
      { label: "Low", value: this.stream.l },
      { label: "Close", value: this.stream.c },
      { label: "Volume", value: this.stream.v },
      { label: "Best bid", value: this.stream.b },
      { label: "Best ask", value: this.stream.a },
      { label: "Total Trades", value: this.stream.n },
      { label: "Price Change over 24hr", value: this.priceChangePercentage }
    ];
  }
}