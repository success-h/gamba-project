import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWalletAddress } from 'gamba-react-v2';
import { GambaUi } from 'gamba-react-ui-v2';
import React, { useState } from 'react';
import { Modal } from '../components/Modal';
import { truncateString } from '../utils';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import { useAppKit } from '@reown/appkit/react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useWalletInfo } from '@reown/appkit/react';

function ConnectedButton() {
  const [modal, setModal] = React.useState(false);
  const wallet = useWallet();
  const ref = React.useRef<HTMLDivElement>(null!);
  const address = useWalletAddress();

  return (
    <>
      {modal && (
        <Modal onClose={() => setModal(false)}>
          <h1>{truncateString(address.toBase58(), 6, 3)}</h1>
          <GambaUi.Button onClick={() => wallet.disconnect()}>
            Disconnect
          </GambaUi.Button>
        </Modal>
      )}
      <div style={{ position: 'relative' }} ref={ref}>
        <GambaUi.Button onClick={() => setModal(true)}>
          <div style={{ display: 'flex', gap: '.5em', alignItems: 'center' }}>
            <img src={wallet.wallet?.adapter.icon} height="20px" />
            {truncateString(address.toBase58(), 3)}
          </div>
        </GambaUi.Button>
      </div>
    </>
  );
}

type Web3Provider = typeof Web3.prototype;
type Account = string | null;

export function UserButton() {
  const walletModal = useWalletModal();
  const wallet = useWallet();
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open, close } = useAppKit();

  const connect = () => {
    if (wallet.wallet) {
      wallet.connect();
    } else {
      walletModal.setVisible(true);
    }
  };

  console.log({ isConnected, address });

  return (
    <>
      {wallet.connected ? (
        <ConnectedButton />
      ) : (
        <GambaUi.Button onClick={connect}>
          {wallet.connecting ? 'Connecting' : 'Connect'}
        </GambaUi.Button>
      )}
      <>
        <>
          {!address ? (
            <GambaUi.Button onClick={() => open()}>
              Connect Wallet (via WalletConnect)
            </GambaUi.Button>
          ) : (
            <div>
              <p>Connected: {address}</p>
              <GambaUi.Button onClick={disconnect}>
                Disconnect Wallet
              </GambaUi.Button>
            </div>
          )}
        </>
      </>
    </>
  );
}
