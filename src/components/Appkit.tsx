import React, { PropsWithChildren, ReactNode } from 'react';
import { createAppKit } from '@reown/appkit/react';

import { WagmiProvider } from 'wagmi';
import { arbitrum, mainnet } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

const queryClient = new QueryClient();

const projectId = '8f98b27c0df8444323858a2c0f5a25b5';

const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

export const networks = [mainnet, arbitrum];

const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  networks,
  projectId,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet, arbitrum],
  metadata,
  projectId,
  features: {
    analytics: true,
  },
});

export function AppKitProvider({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
