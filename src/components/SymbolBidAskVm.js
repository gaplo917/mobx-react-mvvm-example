import { computed } from 'mobx'
import { createDepthTopicFromSymbol } from '../helper'

export default class SymbolBidAskVm {
  constructor({ appState, webSocketState, symbol }) {
    this.appState = appState
    this.webSocketState = webSocketState
    this.symbol = symbol
  }

  @computed
  get topic() {
    return createDepthTopicFromSymbol(this.symbol, this.appState.depth)
  }

  @computed
  get stream() {
    return this.webSocketState.streams.get(this.topic)
  }

  @computed
  get bids() {
    return this.stream ? this.stream.bids : []
  }

  @computed
  get asks() {
    return this.stream ? this.stream.asks : []
  }
}
