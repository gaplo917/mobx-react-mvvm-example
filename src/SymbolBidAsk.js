import React from "react";
import { observable, computed } from "mobx";
import { observer, inject } from "mobx-react";
import { createDepthTopicFromSymbol } from "./helper";
import styled from "styled-components";

class SymbolBidAskVm {
  symbol = null;

  constructor({ appState, webSocketData, symbol }) {
    this.appState = appState;
    this.webSocketData = webSocketData;
    this.symbol = symbol;
  }

  get title() {
    return this.symbol.toUpperCase();
  }

  @computed
  get topic() {
    return createDepthTopicFromSymbol(this.symbol, this.appState.depth);
  }

  @computed
  get stream() {
    return this.webSocketData.streams.get(this.topic);
  }

  @computed
  get bids() {
    return this.stream ? this.stream.bids : [];
  }

  @computed
  get asks() {
    return this.stream ? this.stream.asks : [];
  }
}

const Table = styled.table.attrs({
  className: "table table-bordered col-5 text-center m-2"
})``;

const QuoteTable = ({ title, source }) => (
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
      {source.map(([price, qty], index) => (
        <tr key={index}>
          <td>{price}</td>
          <td>{qty}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

@inject("appState", "webSocketData")
@observer
export default class SymbolBidAsk extends React.Component {
  vm = new SymbolBidAskVm(this.props);

  render() {
    const { vm } = this;

    return (
      <div className="row">
        <QuoteTable title="Bids" source={vm.bids} />
        <QuoteTable title="Asks" source={vm.asks} />
      </div>
    );
  }
}
