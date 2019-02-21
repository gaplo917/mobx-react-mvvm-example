import { computed } from "mobx";
import { SymbolListProps } from "./SymbolList";
import { AppState } from "../states";

export default class SymbolListVm {
  private appState: AppState;

  constructor(init: SymbolListProps) {
    Object.assign(this, init);
  }

  @computed
  get depth() {
    return this.appState.depth;
  }

  @computed
  get favSymbols() {
    return this.appState.favSymbols;
  }

  titleForSymbol(symbol: string) {
    return symbol.toUpperCase();
  }

}
