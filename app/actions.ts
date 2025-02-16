"use server"

import { headers } from "next/headers"
import { kv } from "@vercel/kv"
import { getNextAvailableLinkdrop, markLinkdropAsClaimed } from "@/lib/linkdrops"
import { verifyWalletExists } from "@/utils/near"
import type { ClaimResponse } from "@/types"

// Remove rate limit window as we're implementing one-time-only claims
// const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

export async function requestTokens(address: string): Promise<ClaimResponse> {
  const headersList = headers()
  const ip = headersList.get("x-forwarded-for") || "unknown"

  // Verify if the wallet exists
  const walletStatus = await verifyWalletExists(address)
  if (!walletStatus.exists) {
    return {
      success: false,
      message: walletStatus.message || "This NEAR wallet does not exist. Please create a wallet first.",
    }
  }

  // Check if address has ever claimed (permanent record)
  const hasClaimed = await kv.get(`claimed:${address}`)
  if (hasClaimed) {
    return {
      success: false,
      message: "This wallet has already claimed tokens. Only one claim per wallet is allowed.",
    }
  }

  // Get next available linkdrop
  const linkdrop = await getNextAvailableLinkdrop()
  if (!linkdrop) {
    return {
      success: false,
      message: "No more linkdrops available. Please try again later.",
    }
  }

  try {
    // Mark linkdrop as claimed
    await markLinkdropAsClaimed(linkdrop.id, address)

    // Store permanent claim record
    await kv.set(`claimed:${address}`, true)

    // Store claim record in history
    const claim = {
      walletAddress: address,
      timestamp: new Date(),
      ipAddress: ip,
      linkdropUrl: linkdrop.url,
      status: "completed",
      isNewWallet: walletStatus.isNew
    }
    await kv.lpush(`claims:history:${address}`, JSON.stringify(claim))

    const message = walletStatus.isNew
      ? "Here is your Keypom linkdrop URL. This will add 1 NEAR to your new wallet. Click it to claim!"
      : "Here is your Keypom linkdrop URL. Click it to claim your 1 NEAR token!"

    return {
      success: true,
      message,
      linkdropUrl: linkdrop.url,
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to process claim. Please try again later",
    }
  }
}

