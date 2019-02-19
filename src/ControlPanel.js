import React from "react";
import { action, computed, observable } from "mobx";
import { createTransformer } from "mobx-utils";
import { observer, inject } from "mobx-react";

class ControlPanelVm {
  constructor({ appState, webSocketData }) {
    this.appState = appState;
    this.webSocketData = webSocketData;
  }

  get depthOptions() {
    return [5, 10, 20];
  }

  @action.bound
  selectDepth(event) {
    this.appState.depth = event.target.value;
  }

  @computed
  get depth() {
    return this.appState.depth;
  }

  @computed
  get subscribedUrl() {
    return this.webSocketData.url;
  }

  @computed
  get subscribedTopics() {
    return this.webSocketData.topics;
  }

  // dynamic expression to select data from reactive source
  selectLastUpdateIdByTopic(topic) {
    const t = createTransformer(it => it.lastUpdateId || it.E);
    return t(this.webSocketData.streams.get(topic));
  }
}

@inject("appState", "webSocketData")
@observer
export default class ControlPanel extends React.Component {
  vm = new ControlPanelVm(this.props);

  render() {
    const { vm } = this;
    return (
      <div>
        <label>Depth:</label>
        <select value={vm.depth} onChange={vm.selectDepth}>
          {vm.depthOptions.map(d => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <p>
          <b>Subscribed WebSocket URL:</b> {vm.subscribedUrl}
        </p>
        <b>Subscribed Topics</b>
        <ul>
          {vm.subscribedTopics.map(it => (
            <li>
              {it} (lastUpdateId: {vm.selectLastUpdateIdByTopic(it)})
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
