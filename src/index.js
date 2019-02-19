/**
 * MobX + React price feed example
 * original forked from https://codesandbox.io/s/v3v0my2370
 * https://blog.gaplotech.com
 * @author Gap撈Tech
 */
import React from "react";
import { render } from "react-dom";
import { observable } from "mobx";
import { observer, Provider } from "mobx-react";
import DevTools from "mobx-react-devtools";
import SymbolList from "./SymbolList";
import AppState from "./AppState";
import WebSocketData from "./WebSocketData";
import ControlPanel from "./ControlPanel";

render(
  <div>
    <Provider appState={new AppState()} webSocketData={new WebSocketData()}>
      <div>
        <ControlPanel />
        <SymbolList />
      </div>
    </Provider>
    <DevTools />
  </div>,
  document.getElementById("root")
);
