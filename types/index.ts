export interface LinkDrop {
  id: number
  url: string
  claimed: boolean
  claimedBy?: string
  claimedAt?: Date
}

export interface Claim {
  walletAddress: string
  timestamp: Date
  ipAddress: string
  linkdropUrl: string
  status: "pending" | "completed" | "failed"
}

export interface ClaimResponse {
  success: boolean
  message: string
  linkdropUrl?: string
}

