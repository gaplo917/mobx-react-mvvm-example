import { action, observable } from "mobx";

export class AppState {
  @observable depth = 10;
  @observable favSymbols = [];

  constructor({ apiService }) {
    this.apiService = apiService;
  }

  @action.bound
  async fetchFavSymbols() {
    this.favSymbols = await this.apiService.getFavSymbols();
  }
}
