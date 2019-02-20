import { action, computed, observable } from "mobx";
import { createDepthTopicFromSymbol, createTickerTopicFromSymbol } from "../helper";

export class WebSocketState {
  _socket = null;
  @observable _topics = [];
  @observable _streams = new Map();

  @action.bound
  subscribeSymbols(symbols, depth) {
    this._disconnectIfNeeded();

    const depthTopics = symbols.map(s => createDepthTopicFromSymbol(s, depth));
    const tickerTopics = symbols.map(createTickerTopicFromSymbol);

    this._topics = [...depthTopics, ...tickerTopics];

    // create empty observable
    this._topics.forEach(topic => {
      this._streams.set(topic, {
        lastUpdateId: -1,
        bids: [],
        asks: []
      });
    });

    this._connectToBinance();
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

  _connectToBinance() {
    const socket = new WebSocket(this.url);

    socket.onmessage = this._handleMessage.bind(this);

    this._socket = socket;
  }

  _handleMessage(event) {
    const { stream, data } = JSON.parse(event.data);
    this._streams.set(stream, data);
  }

  _disconnectIfNeeded() {
    // close the _socket and re-init
    this._socket && this._socket.close();
  }
}
