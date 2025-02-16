"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, ExternalLink } from "lucide-react"
import { isValidNearAddress, sanitizeAddress } from "@/utils/validation"
import { ClaimHistory } from "./claim-history"
import { requestTokens } from "@/app/actions"
import { CopyButton } from "@/components/ui/copy-button"
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
          <h2 className="text-xl md:text-2xl font-semibold">Claim Mainnet NEAR</h2>
        </div>
        <p className="text-near-black/60 text-sm md:text-base font-medium">
          Receive 1 NEAR token via Keypom linkdrop for your mainnet wallet
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert className="border-near-green/20 bg-near-green/10">
          <Info className="h-4 w-4 text-near-green flex-shrink-0" />
          <AlertTitle className="text-near-black font-medium">About Mainnet Keypom Linkdrops</AlertTitle>
          <AlertDescription className="text-near-black/70 text-sm">
            Each mainnet wallet (.near) can claim one Keypom link to receive 1 NEAR token. New wallets with zero balance
            are welcome to claim! The tokens will be sent directly to your mainnet wallet.
            <div className="mt-2 flex flex-col gap-1">
              <a 
                href="https://app.mynearwallet.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-near-black hover:text-near-black/80"
              >
                Create or access your wallet on MyNearWallet <ExternalLink className="ml-1 h-3 w-3" />
              </a>
              <a 
                href="https://nearblocks.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-near-black hover:text-near-black/80"
              >
                View your wallet on NearBlocks <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter your mainnet wallet address (e.g. example.near)"
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
            {isLoading ? "Verifying..." : "Request NEAR"}
          </Button>
        </form>

        {status.type && (
          <Alert
            variant={status.type === "error" ? "destructive" : "default"}
            className={
              status.type === "error" ? "border-near-red/20 bg-near-red/10" : "border-near-green/20 bg-near-green/10"
            }
          >
            <AlertDescription className={status.type === "error" ? "text-near-red" : "text-near-green font-medium"}>
              {status.message}
              {status.linkdropUrl && (
                <div className="mt-2">
                  <div className="relative">
                    <Input
                      value={status.linkdropUrl}
                      readOnly
                      className="font-mono text-xs md:text-sm bg-white border-near-black/10 pr-10 text-near-green"
                    />
                    <div className="absolute right-1 top-1/2 -translate-y-1/2">
                      <CopyButton value={status.linkdropUrl} />
                    </div>
                  </div>
                  <p className="text-sm mt-2 text-near-black/70 font-medium">
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
            <li>• Only mainnet wallets (.near) are eligible</li>
            <li>• New wallets (zero balance) are welcome!</li>
            <li>• Limited to one claim per wallet address</li>
            <li>• Tokens will be sent to your mainnet wallet</li>
            <li>• Make sure to save your Keypom link after claiming</li>
            <li>• Check your wallet status on <a href="https://nearblocks.io" target="_blank" rel="noopener noreferrer" className="text-near-black hover:text-near-black/80">NearBlocks</a></li>
          </ul>
        </div>

        <ClaimHistory address={address} />
      </CardContent>
    </Card>
  )
}

