import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import SymbolBidAskVm from './SymbolBidAskVm'
import { useVm, useAppCtx } from '../hooks'

const Table = styled.table.attrs({
  className: 'table table-sm table-bordered text-center',
})`
  font-size: 10px; 
  
  // Small devices (landscape phones, 576px and up)
  @media (min-width: 576px) {
    font-size: 14px;
  }
  
  // Medium devices (tablets, 768px and up)
  @media (min-width: 768px) { 
    font-size: 16px;
  }
`

const QuoteTable = observer(({ title, source }) => (
  <div className="table-responsive col-6">
    <Table>
      <thead>
        <tr>
          <th colSpan={2}>{title}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Price</td>
          <td>Qty</td>
        </tr>
        {source.map(([price, qty]) => (
          <tr key={price}>
            <td>{price}</td>
            <td>{qty}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
))

export const SymbolBidAsk = observer(props => {
  const vm = useVm(SymbolBidAskVm, [useAppCtx(), props])

  return (
    <div className="row mt-3">
      <b className="col-12 text-center"><u>Real time OrderBook Depth</u></b>
      <QuoteTable title="Bids" source={vm.bids}/>
      <QuoteTable title="Asks" source={vm.asks}/>
    </div>
  )
})
