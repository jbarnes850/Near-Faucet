"use server"

import { headers } from "next/headers"
import { kv } from "@vercel/kv"
import { getNextAvailableLinkdrop, markLinkdropAsClaimed } from "@/lib/linkdrops"
import type { ClaimResponse } from "@/types"

const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

export async function requestTokens(address: string): Promise<ClaimResponse> {
  const headersList = headers()
  const ip = headersList.get("x-forwarded-for") || "unknown"

  // Check if address has claimed within the last 24 hours
  const lastClaim = await kv.get(`claim:${address}`)
  if (lastClaim) {
    return {
      success: false,
      message: "You can only claim once every 24 hours",
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

    // Store claim attempt
    await kv.set(`claim:${address}`, Date.now(), {
      ex: RATE_LIMIT_WINDOW,
    })

    // Store claim record
    const claim = {
      walletAddress: address,
      timestamp: new Date(),
      ipAddress: ip,
      linkdropUrl: linkdrop.url,
      status: "completed",
    }
    await kv.lpush(`claims:history:${address}`, JSON.stringify(claim))

    return {
      success: true,
      message: "Here is your Keypom linkdrop URL. Click it to claim your 10 NEAR tokens!",
      linkdropUrl: linkdrop.url,
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to process claim. Please try again later",
    }
  }
}

