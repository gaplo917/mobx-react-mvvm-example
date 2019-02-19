import React from "react";
import { observable, computed } from "mobx";
import { observer, inject } from "mobx-react";
import { createTickerTopicFromSymbol } from "./helper";
import styled from "styled-components";

class SymbolTickerVm {
  constructor({ webSocketData, symbol }) {
    this.webSocketData = webSocketData;
    this.symbol = symbol;
  }

  @computed
  get topic() {
    return createTickerTopicFromSymbol(this.symbol);
  }

  @computed
  get stream() {
    return this.webSocketData.streams.get(this.topic);
  }

  @computed
  get priceChangePercentage() {
    if (this.stream.P === undefined) return "";
    return this.stream.P > 0 ? `+${this.stream.P}%` : `-${this.stream.P}%`;
  }

  @computed
  get ohclv() {
    return [
      { label: "Open", value: this.stream.o },
      { label: "High", value: this.stream.h },
      { label: "Low", value: this.stream.l },
      { label: "Close", value: this.stream.c },
      { label: "Volume", value: this.stream.v },
      { label: "Volume", value: this.stream.v },
      { label: "Best bid", value: this.stream.b },
      { label: "Best ask", value: this.stream.a },
      { label: "Total Trades", value: this.stream.n },
      { label: "Price Change over 24hr", value: this.priceChangePercentage }
    ];
  }
}

@inject("webSocketData")
@observer
export default class SymbolTicker extends React.Component {
  vm = new SymbolTickerVm(this.props);

  render() {
    const { vm } = this;

    return (
      <div className="row">
        <h4 className="col-12 text-center">24 Hour Stats</h4>
        {vm.ohclv.map(it => (
          <div className="col-6">
            <b>{it.label} :</b> {it.value}
          </div>
        ))}
      </div>
    );
  }
}
