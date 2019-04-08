import React from 'react'
import { observer } from 'mobx-react-lite'
import SymbolTickerVm from './SymbolTickerVm'
import { useVm, useAppCtx } from '../hooks'

export const SymbolTicker = observer(props => {
  const vm = useVm(SymbolTickerVm, [useAppCtx(), props])

  return (
    <div className="row mt-3">
      <b className="col-12 text-center under-line"><u>24 Hour Stats</u></b>
      {vm.stats.map(it => (
        <div className="text-center text-sm-left col-12 col-sm-6 col-lg-4" key={it.label}>
          <b>{it.label}:</b>{it.value}
        </div>
      ))}
    </div>
  )
})
