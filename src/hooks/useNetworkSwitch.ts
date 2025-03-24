import { useEffect } from "react";
import { useAccount, useSwitchChain } from "wagmi";

function useNetworkSwitch() {
  const { isConnected, chainId } = useAccount();

  const { chains, switchChain } = useSwitchChain();

  useEffect(() => {
    const isConnectedToValidNetwork = !!chains.find(
      (chain) => chain.id === chainId
    );

    if (isConnected && !isConnectedToValidNetwork) {
      switchChain({
        chainId: chains[0].id,
      });
    }
  }, [isConnected, chainId]);

  return null;
}

export default useNetworkSwitch;
