"use client";

import { useAccount, usePublicClient } from "wagmi";
import {
    Address,
    createWalletClient,
    getContract,
    custom,
} from "viem";
import abi from "../abis/kritties.json";
import { useMemo } from "react";
import { baseSepolia } from "viem/chains";

export function useDonationContract(contractAddress: Address) {
    const { address: userAddress } = useAccount();
    const publicClient = usePublicClient();

    const walletClient = useMemo(
        () =>
            createWalletClient({
                chain: baseSepolia,
                transport: custom(window.ethereum!),
            }),
        [!!window.ethereum, userAddress]
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

    // ✅ WRITE FUNCTIONS (esperando confirmaciones)

    async function safeMint(to: Address, uri: string) {
        if (!walletClient) throw new Error("Wallet not connected");

        const hash = await contract.write.safeMint([to, uri], {
            account: userAddress,
        });

        return publicClient!.waitForTransactionReceipt({ hash });
    }

    async function donate(tokenAddress: Address, amount: bigint) {
        if (!walletClient) throw new Error("Wallet not connected");

        const hash = await contract.write.donate([tokenAddress, amount], {
            account: userAddress,
        });

        return publicClient!.waitForTransactionReceipt({ hash });
    }

    async function addRegistry(tokenId: bigint, registryUri: string) {
        if (!walletClient) throw new Error("Wallet not connected");

        const hash = await contract.write.addRegistry([tokenId, registryUri], {
            account: userAddress,
        });

        return publicClient!.waitForTransactionReceipt({ hash });
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
