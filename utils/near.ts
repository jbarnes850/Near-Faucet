import { connect, keyStores, utils } from "near-api-js"

const config = {
  networkId: "mainnet",
  nodeUrl: "https://rpc.mainnet.near.org",
  walletUrl: "https://app.mynearwallet.com",
  helperUrl: "https://helper.mainnet.near.org",
  explorerUrl: "https://nearblocks.io",
  keyStore: new keyStores.InMemoryKeyStore(),
}

export async function verifyWalletExists(accountId: string): Promise<{
  exists: boolean
  isNew: boolean
  message?: string
}> {
  try {
    const near = await connect(config)
    const account = await near.account(accountId)
    const state = await account.state()
    
    // Account exists but has no balance (new wallet)
    if (state.amount === "0") {
      return {
        exists: true,
        isNew: true,
        message: "This appears to be a new wallet with no balance. You can still claim your NEAR tokens!"
      }
    }

    // Account exists and has balance
    return {
      exists: true,
      isNew: false
    }
  } catch (error) {
    // Account doesn't exist
    return {
      exists: false,
      isNew: false,
      message: "This NEAR wallet does not exist. Please create a wallet first."
    }
  }
}

export function normalizeNearAmount(amount: number): string {
  return utils.format.parseNearAmount(amount.toString()) || "0"
} 