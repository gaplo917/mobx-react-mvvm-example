import { action, computed, observable } from "mobx";
import { createDepthTopicFromSymbol, createTickerTopicFromSymbol } from "../helper";

export type BinanceMessage = {
  stream: string,
  data: any
}

export class WebSocketState {
  private _socket: WebSocket | null = null;
  @observable private _topics: string[] = [];
  @observable private _streams: Map<string, any> = new Map();

  @action.bound
  subscribeSymbols(symbols: string[], depth: number) {
    this.disconnectIfNeeded();

    const depthTopics = symbols.map(s => createDepthTopicFromSymbol(s, depth));
    const tickerTopics = symbols.map(createTickerTopicFromSymbol);

    this._topics = [...depthTopics, ...tickerTopics];

    this.connectToBinance();
  }

  @computed
  get streams() {
    return this._streams;
  }

  @computed
  get topics() {
    return this._topics;
  }

  @computed
  get topicStr() {
    return this.topics.join("/");
  }

  @computed
  get url() {
    // Binance Websocket Documentation
    // https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md
    return `wss://stream.binance.com:9443/stream?streams=${this.topicStr}`;
  }

  private connectToBinance() {
    const socket = new WebSocket(this.url);

    socket.onmessage = this.handleMessage.bind(this);

    this._socket = socket;
  }

  private handleMessage(event: BinanceMessage) {
    const { stream, data } = JSON.parse(event.data);
    this._streams.set(stream, data);
  }

  private disconnectIfNeeded() {
    // close the _socket and re-init
    this._socket && this._socket.close();
  }
}
