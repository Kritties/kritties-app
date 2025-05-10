"use client";

import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { Address, getContract } from "viem";
import abi from "../artifacts/kritties.json";
import { useMemo } from "react";
import { baseSepolia } from "viem/chains";
import { kritties_bytecode } from "../artifacts/kritties_bytecode";
import { contracts } from "@/utils/contracts";

export function useDonationContract(contractAddress?: Address) {
    const { address: userAddress } = useAccount();
    const publicClient = usePublicClient();
    const { data: walletClient } = useWalletClient();

    const contract = useMemo(
        () =>
            contractAddress &&
            getContract({
                address: contractAddress,
                abi,
                client: { public: publicClient!, wallet: walletClient! },
            }),
        [contractAddress, publicClient, walletClient]
    );

    //Deploy functions

    async function createShelter(name: string, symbol: string) {
        if (!walletClient) throw new Error("Wallet not connected");

        const hash = await walletClient.deployContract({
            abi,
            bytecode: kritties_bytecode,
            args: [
                name,
                symbol,
                userAddress!,
                userAddress!,
                userAddress!,
                userAddress!,
                contracts[baseSepolia.id].kricoin.address,
            ],
            account: userAddress!,
            chain: baseSepolia,
        });

        const receipt = await publicClient!.waitForTransactionReceipt({ hash });
        console.log("contract receipt!!", receipt);
        const contractAddress = receipt.contractAddress;

        if (!contractAddress) throw new Error("Failed to deploy contract");

        return contractAddress;
    }

    // ✅ READ FUNCTIONS

    async function getName() {
        return contract?.read.name();
    }

    async function getSymbol() {
        return contract?.read.symbol();
    }

    async function getTokenUri(tokenId: bigint) {
        return contract?.read.tokenURI([tokenId]);
    }

    async function getBalance(owner: Address) {
        return contract?.read.balanceOf([owner]);
    }

    async function getAllRegistries(tokenId: bigint) {
        return contract?.read.getAllRegistries([tokenId]);
    }

    // ✅ WRITE FUNCTIONS (esperando confirmaciones)

    async function safeMint(to: Address, uri: string) {
        if (!walletClient || !contract) throw new Error("Wallet not connected");

        const hash = await contract?.write.safeMint([to, uri], {
            account: userAddress,
        });

        return publicClient!.waitForTransactionReceipt({ hash });
    }

    async function donate(tokenAddress: Address, amount: bigint) {
        if (!walletClient || !contract) throw new Error("Wallet not connected");

        const hash = await contract?.write.donate([tokenAddress, amount], {
            account: userAddress,
        });

        return publicClient!.waitForTransactionReceipt({ hash });
    }

    async function addRegistry(tokenId: bigint, registryUri: string) {
        if (!walletClient || !contract) throw new Error("Wallet not connected");

        const hash = await contract?.write.addRegistry([tokenId, registryUri], {
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
        createShelter,
    };
}
