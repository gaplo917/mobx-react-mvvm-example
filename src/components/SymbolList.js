import React from 'react'
import { observer } from 'mobx-react-lite'
import { SymbolBidAsk } from './SymbolBidAsk'
import { SymbolTicker } from './SymbolTicker'
import SymbolListVm from './SymbolListVm'
import { useVm, useAppCtx } from '../hooks'

export const SymbolList = observer(props => {
  const vm = useVm(SymbolListVm, useAppCtx())

  return vm.favSymbols.map(symbol => (
    <section key={symbol}>
      <div className="border-top my-5"/>
      <h1 className="text-center">{vm.titleForSymbol(symbol)}</h1>
      <SymbolTicker symbol={symbol}/>
      <SymbolBidAsk symbol={symbol}/>
    </section>
  ))
})
