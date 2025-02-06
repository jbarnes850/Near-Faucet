export function isValidNearAddress(address: string): boolean {
  // NEAR accounts can be 2-64 characters and contain lowercase letters, digits, and special characters
  const nearAddressRegex = /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/
  return address.length >= 2 && address.length <= 64 && nearAddressRegex.test(address)
}

export function sanitizeAddress(address: string): string {
  return address.toLowerCase().trim()
}

