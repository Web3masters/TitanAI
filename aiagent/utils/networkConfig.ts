/**
 * This file contains network configuration for blockchain networks used in the application
 */

interface NetworkConfig {
  name: string;
  rpcUrl: string;
  explorerUrl: string;
  chainId: number;
  currencySymbol: string;
}

const networks: Record<string, NetworkConfig> = {
  "Sonic Blaze Testnet": {
    name: "Sonic Blaze Testnet",
    rpcUrl: "https://rpc.blaze.soniclabs.com",
    explorerUrl: "https://testnet.sonicscan.org",
    chainId: 57054,
    currencySymbol: "S"
  }
};

export default networks;