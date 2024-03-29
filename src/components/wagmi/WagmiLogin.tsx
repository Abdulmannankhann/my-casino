import { Button, Typography } from "@mui/material";
import React from "react";
import { useAccount, useBalance, useConnect, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import MetaMaskLogo from "../../assets/images/metamask.svg";

const WagmiLogin = () => {
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  const { data: balance } = useBalance({
    address: address,
  });

  if (isConnected) {
    return (
      <div>
        {connector && <Typography color="green">Connected to {connector.name}</Typography>}
        {!!ensAvatar && <img src={ensAvatar} alt="ENS Avatar" />}
        <Typography>
          Wallet Address: <strong>{address}</strong>
        </Typography>
        {balance && (
          <Typography>
            Balance:{" "}
            <strong>
              {balance?.formatted} {balance?.symbol}
            </strong>
          </Typography>
        )}
        <Button
          color="error"
          onClick={() => {
            disconnect();
          }}
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="form-web3">
      {connectors.map((connector) => (
        <Button variant="outlined" disabled={!connector.ready} key={connector.id} onClick={() => connect({ connector })} startIcon={<img src={MetaMaskLogo} alt={connector.name} />}>
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading && connector.id === pendingConnector?.id && " (connecting)"}
        </Button>
      ))}
      {error && <Typography color="error">{error.message}</Typography>}
    </div>
  );
};

export default WagmiLogin;
