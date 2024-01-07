import { createClient, configureChains, mainnet } from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const { chains, provider, webSocketProvider } = configureChains([mainnet], [alchemyProvider({ apiKey: "gE_OjodHyW2BB4NCc5dvPSvZx2T9IahO" }), publicProvider()]);

// Configuração do cliente
export const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        shimDisconnect: true,
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
    //new CoinbaseWalletConnector({
    //  chains,
    //  options: {
    //    appName: "wagmi",
    //  },
    //}),
    //new WalletConnectConnector({
    //  chains,
    //  options: {
    //    qrcode: true,
    //  },
    //}),
    //new InjectedConnector({
    //  chains,
    //  options: {
    //    name: "Injected",
    //    shimDisconnect: true,
    //  },
    //}),
  ],
  provider,
  webSocketProvider,
});
