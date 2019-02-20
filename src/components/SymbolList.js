import React from "react";
import { action, computed, observable, reaction } from "mobx";
import { inject, observer } from "mobx-react";
import SymbolBidAsk from "./SymbolBidAsk";
import SymbolTicker from "./SymbolTicker";

class SymbolListVm {
  @observable favSymbols = [];

  constructor({ appState, webSocketState }) {
    this.appState = appState;
    this.webSocketState = webSocketState;

    this.reaction = reaction(
      () => this.depth,
      () => this.subscribeFavSymbols(),
      { fireImmediately: true }
    );
  }

  @action.bound
  async subscribeFavSymbols() {
    const favSymbols = await this.appState.getFavSymbols();
    const depth = this.depth;
    this.webSocketState.subscribeSymbols(favSymbols, depth);

    this.favSymbols = favSymbols;
  }

  @computed
  get depth() {
    return this.appState.depth;
  }

  titleForSymbol(symbol) {
    return symbol.toUpperCase();
  }

  dispose() {
    this.reaction();
  }
}

@inject("appState", "webSocketState")
@observer
export default class SymbolList extends React.Component {
  vm = new SymbolListVm(this.props);

  componentWillUnmount() {
    this.vm.dispose();
  }

  render() {
    const { vm } = this;
    return vm.favSymbols.map(symbol => (
      <section className="mt-4 card p-4">
        <h1>{vm.titleForSymbol(symbol)}</h1>
        <SymbolTicker symbol={symbol} key={symbol}/>
        <SymbolBidAsk symbol={symbol} key={symbol}/>
      </section>
    ));
  }
}
