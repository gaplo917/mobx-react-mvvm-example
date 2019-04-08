import React from 'react'
import DevTools from 'mobx-react-devtools'
import { hot } from 'react-hot-loader/root'
import { ControlPanel } from './ControlPanel'
import { SymbolList } from './SymbolList'

function App() {
  return (
    <div className="container">
      <>
        <ControlPanel/>
        <SymbolList/>
      </>
      <DevTools/>
    </div>
  )
}

export default hot(App)
