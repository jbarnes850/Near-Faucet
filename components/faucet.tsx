"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { isValidNearAddress, sanitizeAddress } from "@/utils/validation"
import { ClaimHistory } from "./claim-history"
import { requestTokens } from "@/app/actions"
import Image from "next/image"

export function Faucet() {
  const [address, setAddress] = useState("")
  const [status, setStatus] = useState<{
    type: "error" | "success" | null
    message: string
    linkdropUrl?: string
  }>({
    type: null,
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setStatus({ type: null, message: "" })

    const sanitizedAddress = sanitizeAddress(address)

    if (!isValidNearAddress(sanitizedAddress)) {
      setStatus({
        type: "error",
        message: "Please enter a valid NEAR address",
      })
      setIsLoading(false)
      return
    }

    try {
      const response = await requestTokens(sanitizedAddress)
      setStatus({
        type: response.success ? "success" : "error",
        message: response.message,
        linkdropUrl: response.linkdropUrl,
      })
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to process request. Please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full border-none shadow-lg bg-white">
      <CardHeader className="pb-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="bg-near-black rounded-full p-2 flex-shrink-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon_rev_nomargin-KtX4aoW9VjCFJIwKuOsACpdJ6XjwYB.png"
              alt="NEAR Icon"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
          <h2 className="text-xl md:text-2xl font-semibold">Claim NEAR Tokens</h2>
        </div>
        <p className="text-near-black/60 text-sm md:text-base font-medium">
          Receive 10 NEAR tokens via Keypom linkdrop for development and testing
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert className="border-near-green/20 bg-near-green/10">
          <Info className="h-4 w-4 text-near-green flex-shrink-0" />
          <AlertTitle className="text-near-black font-medium">About Keypom Linkdrops</AlertTitle>
          <AlertDescription className="text-near-black/70 text-sm">
            Each claim provides a unique Keypom link that will allow you to receive 10 NEAR tokens. You can claim these
            tokens by creating a new wallet or connecting an existing one.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter your NEAR wallet address (e.g. example.near)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border-near-black/10 focus:border-near-green focus:ring-near-green text-sm md:text-base"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-near-black hover:bg-near-black/90 text-white font-medium text-sm md:text-base"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Request Tokens"}
          </Button>
        </form>

        {status.type && (
          <Alert
            variant={status.type === "error" ? "destructive" : "default"}
            className={
              status.type === "error" ? "border-near-red/20 bg-near-red/10" : "border-near-green/20 bg-near-green/10"
            }
          >
            <AlertDescription className={status.type === "error" ? "text-near-red" : "text-near-green"}>
              {status.message}
              {status.linkdropUrl && (
                <div className="mt-2">
                  <Input
                    value={status.linkdropUrl}
                    readOnly
                    className="font-mono text-xs md:text-sm bg-white border-near-black/10"
                  />
                  <p className="text-sm mt-2 text-near-black/60 font-medium">
                    Click the link above to claim your tokens. Make sure to save it!
                  </p>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        <div className="border-t border-near-black/10 pt-4">
          <h3 className="font-medium mb-2 text-near-black text-sm md:text-base">Important Notes:</h3>
          <ul className="text-xs md:text-sm space-y-1 text-near-black/60">
            <li>• Limited to one claim per wallet address every 24 hours</li>
            <li>• Tokens are for testing and development purposes only</li>
            <li>• Make sure to save your Keypom link after claiming</li>
          </ul>
        </div>

        <ClaimHistory address={address} />
      </CardContent>
    </Card>
  )
}

