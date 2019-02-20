import React from "react";
import { Provider } from "mobx-react";
import { AppState, WebSocketState } from "../states";
import ControlPanel from "./ControlPanel";
import SymbolList from "./SymbolList";
import DevTools from "mobx-react-devtools";
import { hot } from "react-hot-loader/root";
import { ApiService } from "../services/ApiService";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Provider
          appState={new AppState({ apiService: new ApiService() })}
          webSocketState={new WebSocketState()}>
          <>
            <ControlPanel/>
            <SymbolList/>
          </>
        </Provider>
        <DevTools/>
      </div>
    );
  }
}

export default hot(App);
