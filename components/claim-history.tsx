"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { History } from "lucide-react"
import type { Claim } from "@/types"

interface ClaimHistoryProps {
  address: string
}

export function ClaimHistory({ address }: ClaimHistoryProps) {
  const [claims, setClaims] = useState<Claim[]>([])

  useEffect(() => {
    if (address) {
      fetch(`/api/claims?address=${encodeURIComponent(address)}`)
        .then((res) => res.json())
        .then((data) => setClaims(data))
    }
  }, [address])

  if (!address || claims.length === 0) return null

  return (
    <Card className="mt-4 border-none bg-near-black/5">
      <CardContent className="pt-4">
        <div className="flex items-center gap-2 mb-4">
          <History className="h-4 w-4 md:h-5 md:w-5" />
          <h2 className="text-base md:text-lg font-semibold">Claim History</h2>
        </div>
        <div className="space-y-3">
          {claims.map((claim, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0 text-sm bg-white p-3 rounded-lg shadow-sm border border-near-black/5"
            >
              <div className="flex flex-col">
                <span className="font-medium">{new Date(claim.timestamp).toLocaleDateString()}</span>
                <span className="text-xs text-near-black/60">{new Date(claim.timestamp).toLocaleTimeString()}</span>
              </div>
              <span
                className={`
                px-2 py-1 rounded-full text-xs font-medium w-fit
                ${
                  claim.status === "completed"
                    ? "bg-near-green/10 text-near-green"
                    : claim.status === "failed"
                      ? "bg-near-red/10 text-near-red"
                      : "bg-near-purple/10 text-near-purple"
                }
              `}
              >
                {claim.status}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

