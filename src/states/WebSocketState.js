import { action, computed, observable } from 'mobx'
import { createDepthTopicFromSymbol, createTickerTopicFromSymbol } from '../helper'

export class WebSocketState {
  _host = null

  _port = null

  _socket = null

  @observable _topics = []

  @observable _streams = new Map()

  constructor(host = 'stream.binance.com', port = 9443) {
    this._host = host
    this._port = port
  }

  subscribeSymbols(symbols, depth) {
    this._disconnectIfNeeded()

    const depthTopics = symbols.map(s => createDepthTopicFromSymbol(s, depth))
    const tickerTopics = symbols.map(createTickerTopicFromSymbol)

    this._topics = [...depthTopics, ...tickerTopics]

    // create empty observable
    this._topics.forEach((topic) => {
      this._streams.set(topic, {})
    })

    this._connectToBinance()
  }

  @computed
  get streams() {
    return this._streams
  }

  @computed
  get topics() {
    return this._topics
  }

  @computed
  get topicStr() {
    return this.topics.join('/')
  }

  @computed
  get url() {
    // Binance Websocket Documentation
    // https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md
    return `wss://${this._host}:${this._port}/stream?streams=${this.topicStr}`
  }

  _connectToBinance() {
    const socket = new WebSocket(this.url)

    socket.onmessage = this._handleMessage.bind(this)

    this._socket = socket
  }

  _handleMessage(event) {
    const { stream, data } = JSON.parse(event.data)
    this._streams.set(stream, data)
  }

  _disconnectIfNeeded() {
    // close the _socket and re-init
    if (this._socket) this._socket.close()
  }
}
