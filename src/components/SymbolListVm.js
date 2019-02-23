import { computed } from 'mobx'

export default class SymbolListVm {
  constructor({ appState, webSocketState }) {
    this.appState = appState
    this.webSocketState = webSocketState
  }

  @computed
  get depth() {
    return this.appState.depth
  }

  @computed
  get favSymbols() {
    return this.appState.favSymbols
  }

  titleForSymbol(symbol) {
    return symbol.toUpperCase()
  }
}
