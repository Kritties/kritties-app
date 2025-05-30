"use client";

import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { getContract, Address, custom } from "viem";
import abi from "../artifacts/kricoin.json";
import { useMemo } from "react";

export function useTokenContract(contractAddress: Address) {
    const { address: userAddress } = useAccount();
    const publicClient = usePublicClient();
    const { data: walletClient } = useWalletClient();

    console.log("walletClient", walletClient)

    const contract = useMemo(
        () =>
            getContract({
                address: contractAddress,
                abi,
                client: { public: publicClient!, wallet: walletClient! },
            }),
        [contractAddress, publicClient, walletClient]
    );

    // ✅ READ FUNCTIONS

    async function getBalance(user: Address) {
        return contract.read.balanceOf([user]);
    }

    async function getSymbol() {
        return contract.read.symbol();
    }

    async function getAllowance(owner: Address, spender: Address) {
        return contract.read.allowance([owner, spender]) as Promise<bigint>;
    }

    // ✅ WRITE FUNCTIONS (con espera de confirmación)

    async function transferTokens(to: Address, amount: bigint) {
        if (!walletClient) throw new Error("Wallet not connected");

        const hash = await contract.write.transfer([to, amount], {
            account: userAddress,
        });

        return publicClient!.waitForTransactionReceipt({ hash });
    }

    async function approve(spender: Address, amount: bigint) {
        if (!walletClient) throw new Error("Wallet not connected");

        const hash = await contract.write.approve([spender, amount], {
            account: userAddress,
        });

        return publicClient!.waitForTransactionReceipt({ hash });
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
