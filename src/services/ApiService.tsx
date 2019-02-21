/**
 * This class should be stateless and portable
 */
export class ApiService {
  public async getFavSymbols(): Promise<string[]> {
    const fakeFavSymbolsApiCall: () => Promise<string[]> = () =>
      new Promise(resolve => {
        // assume there are few fav symbols
        // for demo purpose no need to add extra axios library to call api & CORS problem
        // https://api.binance.com/api/v1/exchangeInfo  response.symbols

        setTimeout(
          () =>
            resolve([
              "ethbtc",
              "btcusdt",
              "xrpbtc",
              "xrpeth",
              "ethusdt",
              "ltcbtc",
              "neobtc",
              "eoseth",
              "tusdusdt"
            ]),
          300
        );
      });

    return await fakeFavSymbolsApiCall();
  }
}
