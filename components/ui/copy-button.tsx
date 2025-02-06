import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { Button } from "./button"

interface CopyButtonProps {
  value: string
  className?: string
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(value)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      className={className}
      onClick={copyToClipboard}
      title={hasCopied ? "Copied!" : "Copy to clipboard"}
    >
      {hasCopied ? (
        <Check className="h-4 w-4 text-near-green" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  )
} 