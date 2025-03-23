"use client";

import { useAccount, usePublicClient } from "wagmi";
import { getContract, Address, createWalletClient, custom } from "viem";
import abi from "../abis/kricoin.json"; // tu ABI importado
import { useMemo } from "react";
import { baseSepolia } from "viem/chains";

export function useTokenContract(contractAddress: Address) {
    const { address: userAddress } = useAccount();
    // const { data: walletClient } = useWalletClient();
    const publicClient = usePublicClient();

    // eg: Metamask
    const walletClient = useMemo(
        () =>
            createWalletClient({
                chain: baseSepolia,
                transport: custom(window.ethereum!),
            }),
        [!!window.ethereum]
    );

    const contract = useMemo(
        () =>
            getContract({
                address: contractAddress,
                abi,
                client: { public: publicClient!, wallet: walletClient },
            }),
        [contractAddress, publicClient, walletClient]
    );

    async function getBalance(user: Address) {
        return contract.read.balanceOf([user]);
    }

    async function getSymbol() {
        return contract.read.symbol();
    }

    async function transferTokens(to: Address, amount: bigint) {
        if (!walletClient) throw new Error("Wallet not connected");
        return contract?.write?.transfer([to, amount], {
            account: userAddress,
        });
    }

    async function approve(spender: Address, amount: bigint) {
        if (!walletClient) throw new Error("Wallet not connected");
        return contract.write.approve([spender, amount], {
            account: userAddress,
        });
    }

    async function getAllowance(owner: Address, spender: Address) {
        return contract.read.allowance([owner, spender]);
    }

    return {
        getBalance,
        getSymbol,
        transferTokens,
        approve,
        getAllowance,
        userAddress,
    };
}
