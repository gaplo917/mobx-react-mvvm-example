import React from 'react'
import { observer, Observer, useDisposable } from 'mobx-react-lite'
import ControlPanelVm from './ControlPanelVm'
import { useVm, useAppCtx } from '../hooks'

// change to `false` and check the result with "React Dev Tools > Highlight Updates"
const showOptimizedVersion = true

export const ControlPanel = observer(props => {
  const vm = useVm(ControlPanelVm, useAppCtx())

  useDisposable(() => vm.registerDepthReaction())

  return (
    <div className="mt-5">
      <label>Depth:</label>
      <select value={vm.depth} onChange={vm.onSelectDepth}>
        {vm.depthOptions.map(d => (
          <option key={d}>{d}</option>
        ))}
      </select>
      <p>
        <b>Subscribed WebSocket URL:</b> {vm.subscribedUrl}
      </p>
      <b>Subscribed Topics</b>
      <ul>
        {
          // MobX Optimization show case, this can reduce parent re-render
          showOptimizedVersion
            ? vm.subscribedTopics.map(it => (
              <Observer key={it}>
                {() => <li>{it}(event uid:{vm.selectEventUidByTopic(it)})</li>}
              </Observer>))
            : vm.subscribedTopics.map(it => (
              <li key={it}>
                {it}(event uid:{vm.selectEventUidByTopic(it)})
              </li>
            ))
        }
      </ul>
    </div>
  )
})
