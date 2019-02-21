import { computed } from "mobx";
import { createDepthTopicFromSymbol } from "../helper";
import { AppState, WebSocketState } from "../states";
import { SymbolBidAskProps } from "./SymbolBidAsk";

export type Quote = {
  price: string
  qty: string
}

export default class SymbolBidAskVm {
  private appState: AppState;
  private webSocketState: WebSocketState;
  private symbol: string;

  constructor(init: SymbolBidAskProps) {
    Object.assign(this, init);
  }

  @computed
  get topic() {
    return createDepthTopicFromSymbol(this.symbol, this.appState.depth);
  }

  @computed
  get stream() {
    return this.webSocketState.streams.get(this.topic);
  }

  @computed
  get bids(): Array<Quote[]> {
    return this.stream ? this.stream.bids : [];
  }

  @computed
  get asks(): Array<Quote[]> {
    return this.stream ? this.stream.asks : [];
  }
}
