import { base, baseSepolia } from "wagmi/chains";
import { environment } from "./env";

export const chainId = environment.IS_TESTNET ? baseSepolia.id : base.id;

export const contracts= {
  [baseSepolia.id as number]: {
    // TODO: move to db
    kritties: "0x42575Ac7e60d9927C426b724e750621a52E067F1",    
    paymentToken: {
      address: "0x16760858e6D70D2C1a6657517437Bd0DB4D85171",
      decimals: 18,
    },
    kricoin: {
      address: "0x7432A00b4B3Ba1fC9BE489c16A5Da9E7f3b766D8",
      decimals: 8
    },
  },
} as const;
