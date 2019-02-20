import React from "react";
import { inject, observer } from "mobx-react";
import SymbolTickerVm from "./SymbolTickerVm";

@inject("webSocketState")
@observer
export default class SymbolTicker extends React.Component {
  vm = new SymbolTickerVm(this.props);

  render() {
    const { vm } = this;

    return (
      <div className="row mt-3">
        <b className="col-12 text-center under-line"><u>24 Hour Stats</u></b>
        {vm.stats.map(it => (
          <div className="text-center text-sm-left col-12 col-sm-6 col-lg-4" key={it.label}>
            <b>{it.label} :</b> {it.value}
          </div>
        ))}
      </div>
    );
  }
}
