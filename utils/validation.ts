const MAINNET_ACCOUNT_REGEX = /^((?![\_.])(?!.*[\_.]{2})[a-z0-9\_.]{2,64})\.near$/

export function isValidNearAddress(address: string): boolean {
  if (!address) return false
  return MAINNET_ACCOUNT_REGEX.test(address)
}

export function sanitizeAddress(address: string): string {
  return address.toLowerCase().trim()
}

