"use client";

import { useAccount, usePublicClient } from "wagmi";
import {
    Address,
    createWalletClient,
    getContract,
    custom,
} from "viem";
import abi from "../abis/kritties.json"; // guardá este ABI en este archivo
import { useMemo } from "react";
import { baseSepolia } from "viem/chains";

export function useDonationContract(contractAddress: Address) {
    const { address: userAddress } = useAccount();
    //const { data: walletClient } = useWalletClient();
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

    // ✅ READ FUNCTIONS

    async function getName() {
        return contract.read.name();
    }

    async function getSymbol() {
        return contract.read.symbol();
    }

    async function getTokenUri(tokenId: bigint) {
        return contract.read.tokenURI([tokenId]);
    }

    async function getBalance(owner: Address) {
        return contract.read.balanceOf([owner]);
    }

    async function getAllRegistries(tokenId: bigint) {
        return contract.read.getAllRegistries([tokenId]);
    }

    // ✅ WRITE FUNCTIONS

    async function safeMint(to: Address, uri: string) {
        if (!walletClient) throw new Error("Wallet not connected");
        return contract.write.safeMint([to, uri], {
            account: userAddress,
        });
    }

    async function donate(tokenAddress: Address, amount: bigint) {
        if (!walletClient) throw new Error("Wallet not connected");
        return contract.write.donate([tokenAddress, amount], {
            account: userAddress,
        });
    }

    async function addRegistry(tokenId: bigint, registryUri: string) {
        if (!walletClient) throw new Error("Wallet not connected");
        return contract.write.addRegistry([tokenId, registryUri], {
            account: userAddress,
        });
    }

    return {
        getName,
        getSymbol,
        getTokenUri,
        getBalance,
        getAllRegistries,
        safeMint,
        donate,
        addRegistry,
        userAddress,
    };
}
