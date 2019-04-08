import { createContext } from 'react'
import { AppState, WebSocketState } from "../states";
import { ApiService } from "../services";

const appState = new AppState({ apiService: new ApiService() })
const webSocketState = new WebSocketState()

// Context with default value doesn't need to wrap it over <App/>
// Because of MobX, all flows of data depends on @observable,
// thus, the object ref won't change afterwards in this simple example
export const ApplicationContext = createContext({ appState, webSocketState })
