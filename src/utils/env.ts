
const IS_TESTNET = process.env.NEXT_PUBLIC_IS_TESTNET ?? "true";

export const environment = {
  IS_TESTNET: IS_TESTNET?.toLowerCase() === "true",
}