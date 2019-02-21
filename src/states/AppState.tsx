import { action, observable } from "mobx";
import { ApiService } from "../services/ApiService";

type Props = {
  apiService: ApiService
}

export class AppState {
  private apiService: ApiService;
  @observable depth: number = 10;
  @observable favSymbols: string[] = [];

  constructor(init: Props) {
    Object.assign(this, init);
  }

  @action.bound
  async fetchFavSymbols() {
    this.favSymbols = await this.apiService.getFavSymbols();
  }
}
