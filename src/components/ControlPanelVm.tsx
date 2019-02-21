import { action, computed, IReactionDisposer, reaction } from "mobx";
import { createTransformer } from "mobx-utils";
import { AppState, WebSocketState } from "../states";
import { ChangeEvent } from "react";
import { ControlPanelProps } from "./ControlPanel";

export default class ControlPanelVm {
  private appState: AppState;
  private webSocketState: WebSocketState;
  private readonly reaction: IReactionDisposer | undefined;

  constructor(init: ControlPanelProps) {
    Object.assign(this, init);

    // show case of reaction
    this.reaction = reaction(
      () => this.depth,
      () => this.onDepthChange(),
      { fireImmediately: true }
    );

  }

  get depthOptions() {
    return [5, 10, 20];
  }

  async onDepthChange() {
    await this.appState.fetchFavSymbols();

    this.webSocketState.subscribeSymbols(this.appState.favSymbols, this.appState.depth);
  }

  @action.bound
  onSelectDepth(event: ChangeEvent<HTMLSelectElement>): void {
    this.appState.depth = parseInt(event.target.value);
  }

  @computed
  get depth() {
    return this.appState.depth;
  }

  @computed
  get subscribedUrl() {
    return this.webSocketState.url;
  }

  @computed
  get subscribedTopics() {
    return this.webSocketState.topics;
  }

  // dynamic expression to select data from reactive source
  selectEventUidByTopic(topic: string): any {
    const t = createTransformer<any, string>(it => it.lastUpdateId || it.E);
    return t(this.webSocketState.streams.get(topic) || {});
  }

  dispose() {
    this.reaction();
  }
}
