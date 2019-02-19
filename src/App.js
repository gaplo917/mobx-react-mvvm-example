import React from "react";
import {observer, Provider} from "mobx-react";
import AppState from "./AppState";
import WebSocketData from "./WebSocketData";
import ControlPanel from "./ControlPanel";
import SymbolList from "./SymbolList";
import DevTools from "mobx-react-devtools";
import { hot } from "react-hot-loader/root"

class App extends React.Component {
    render() {
        return (
            <>
                <Provider appState={new AppState()} webSocketData={new WebSocketData()}>
                    <>
                        <ControlPanel />
                        <SymbolList />
                    </>
                </Provider>
                <DevTools />
            </>
        )
    }
}

export default observer(hot(App))
