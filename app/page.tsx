import { Faucet } from "@/components/faucet"
import Image from "next/image"
import { initializeLinkdrops } from "@/lib/linkdrops"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export default async function Home() {
  let kvError = false
  let errorMessage = ""

  try {
    await initializeLinkdrops()
  } catch (error) {
    console.error("Failed to initialize linkdrops:", error)
    kvError = true
    errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
  }

  return (
    <div className="min-h-screen flex flex-col bg-near-offwhite">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8 md:mb-12">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_nomargin-RzElMAobN7bKSWJEZ4JHW18PntqBy4.png"
            alt="NEAR Protocol"
            width={180}
            height={68}
            className="w-[180px] md:w-[240px] h-auto"
            priority
          />
        </div>
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-near-black text-left mb-2">Token Faucet</h1>
          <p className="text-near-black/80 text-left text-base md:text-lg mb-4 md:mb-8 font-medium">
            Claim tokens for building applications on NEAR
          </p>
          {kvError && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                The faucet is running in fallback mode. Please contact the administrator to set up Vercel KV. Error:{" "}
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}
          <Faucet />
        </div>
      </main>

      <footer className="w-full bg-near-black text-near-white mt-auto py-4 md:py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
            <p className="text-sm text-center md:text-left">Learn more about building on NEAR:</p>
            <div className="flex items-center space-x-6">
              <a
                href="https://docs.near.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-near-green hover:text-near-green/80 text-sm transition-colors"
              >
                NEAR Docs
              </a>
              <a
                href="https://docs.near-intents.org/near-intents"
                target="_blank"
                rel="noopener noreferrer"
                className="text-near-green hover:text-near-green/80 text-sm transition-colors"
              >
                NEAR Intents Docs
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

