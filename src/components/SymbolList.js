import React from 'react'
import { inject, observer } from 'mobx-react'
import SymbolBidAsk from './SymbolBidAsk'
import SymbolTicker from './SymbolTicker'
import SymbolListVm from './SymbolListVm'

@inject('appState', 'webSocketState')
@observer
export default class SymbolList extends React.Component {
  vm = new SymbolListVm(this.props)

  render() {
    const { vm } = this
    return vm.favSymbols.map(symbol => (
      <section key={symbol}>
        <div className="border-top my-5"/>
        <h1 className="text-center">{vm.titleForSymbol(symbol)}</h1>
        <SymbolTicker symbol={symbol}/>
        <SymbolBidAsk symbol={symbol}/>
      </section>
    ))
  }
}
