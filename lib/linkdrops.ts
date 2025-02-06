import { kv } from "@vercel/kv"
import type { LinkDrop } from "@/types"

const LINKDROPS = [
  "https://keypom.xyz/claim/v2.keypom.near#pPJE5zuUdH3ECuY6x3g3sqC4NnePZRvJkA5eXASmKHtsoxJzd3GMgaL1YCwvxKUtKcMnTHUzasoDvw7ts7RN7Ja",
  "https://keypom.xyz/claim/v2.keypom.near#3ibTyvUPkzBWRq6w9xdUhU7T2rLDtF1MfE5RZLtovAagLM8fkhTsi3o6HN9NhBe3AnWwZDTw2Hnw7eXn75Pqp2aR",
  "https://keypom.xyz/claim/v2.keypom.near#4ZggB7JRPZ1qmt6X85gMSvQHFYUzRgWu8KtYmxDhKBRsvxJhLThyfMbghcR5Rtgc15iBzrqSDfX4vQ1r5FG9A9Vs",
  "https://keypom.xyz/claim/v2.keypom.near#64S6JB8jZM786TfoJWiRWT5ZoCYEbLdLqqD5t7P6bFadvMx8ag4ieJGBjzpMP1fZBmktKCEWpeUzX3jUYVGL8xpr",
  "https://keypom.xyz/claim/v2.keypom.near#4Cf9Z3bJbPZKmLKZogbabq7Arjs3rZpqwJFSW7PBqGQGYjV64F7RLCNYY3GiD5BXH7PRoNGz4pDqM66T1hfvgYh6",
  "https://keypom.xyz/claim/v2.keypom.near#5QaneM93RgqqiL1C9fdRtHRfxpg1DZCPgSDf6jpzeivKidTb8Y23aE2L3xqtN2wrGB1AHZ93H9a2DRUDA9GnUzNs",
  "https://keypom.xyz/claim/v2.keypom.near#3VgGkvfG78zuwxpsyFCqN4iYQRwDheEQVCG2uVoCX9cCeiAe5gS7WUzEnQEU3djmT3gVeACPKGTLFFaXv5DV7Ji3",
  "https://keypom.xyz/claim/v2.keypom.near#cwE9gzW9jMipoyRThMik7TfMJBevKMTPQFJ6RmmnU1gDkyi52HPFUrQiXUcBAy5ypQ9rkFfmWJXUL1py1Gx7sRU",
  "https://keypom.xyz/claim/v2.keypom.near#5y4szg8NMYnfHbBaMQTsG4XjL8k35EaQnK7JHsvEUexjGKT8JH3kmy4tG7ByqHzUDU8bTR22mYzBJjP8wJgzEpyU",
  "https://keypom.xyz/claim/v2.keypom.near#2ERRZ1rShbaFbbix4np953Eq51TpMbvaXX7A3UsFDBaxzacdHL3ShVrTvEyA2o9tpWxTmGaS9y6zN8SXx2njkNnx",
  "https://keypom.xyz/claim/v2.keypom.near#5xfmndkKBZa7JUvbK8qdSMbGHcRcN4gzYMu7XuC43UjBiZtc2CSG3t51Dfkm8SEfvtHQSU6Vj46N9EGQixUCqjnw",
  "https://keypom.xyz/claim/v2.keypom.near#5nPXfHHTfb4oxTwE9CitRarNscVyuaL1EZd1HPRQov7Gu5gTGLnXwsTN6hXvQQedWuhhARexcNFatZ2ddVDMAYpZ",
  "https://keypom.xyz/claim/v2.keypom.near#5iofBBkQeuAw7Bxk6xx5bi4VP9Rg9zjCTepzD4k9G7whRSNj1HzXesdvLujZSFZjgfsjBbJgH1DMCq4ZS9ZWDYGG",
  "https://keypom.xyz/claim/v2.keypom.near#56Kgj5oa2weLoi18oJLZ1XEJ4sGY6T57dAwakgVVkkAjhcxe5ze8K2MCpioSjBebCnDEcX6VAy1BYkudwTCMrj7w",
  "https://keypom.xyz/claim/v2.keypom.near#nNZcggPSBJjwm91EEhsE1gYaFqCBi6b15yuabZC3jsW3HpcUvY57qGG7pvJa86ieeW8txxUAUMVLtZ34SMeZuGM",
  "https://keypom.xyz/claim/v2.keypom.near#2GthFrN7F42xYTKExgXFsLvkEFXXK6gh8k1DPR84cgMABkC71WGDS1YmJbfukf6Dfhs8ruXRb6zGYuYpckkv4ZJY",
  "https://keypom.xyz/claim/v2.keypom.near#3PVeV22H3LbTCeFKT6eN2DQkT54Ch84qVDjid1nvnrMUBPpDU8bAhHRVCy4DHyNL9z1c9ZXnxv6YdrpmwUNqnozj",
  "https://keypom.xyz/claim/v2.keypom.near#44MxmHQnSVjVfJ8CMR7Xs7ZsHnj7b14CX76WsNrAq5BQig7cwTNKJ7qeWdmpr1gKBBDfHRLx1fUbgxTP4P4uwBN1",
  "https://keypom.xyz/claim/v2.keypom.near#4h6XZripTkM9q3n59xroS7iRvTiP7LRVSRqNtcVmh3SdjbaVK4iwGBArQsdYXyaHhSuAJa5Wng1gZmKCP9KvDvJm",
  "https://keypom.xyz/claim/v2.keypom.near#hDY3pSeU163BYDw2UFjbXEVbDasihQ7btBRX5XRLnjHKezAmTRJHEH5oUA4YhXyC6jjVLBYBvRMMzCwpC95jgNk",
  "https://keypom.xyz/claim/v2.keypom.near#4MjdonRiy5S4jFN6Whju33UzF79FUoqprURthnppGwRpUV2CjCjV16tseLYQzcp2dz3uB6oBC7XijTdb6jXJgwsj",
  "https://keypom.xyz/claim/v2.keypom.near#3pa58YSWpkSv8MxsFb53wh49sH7Z8gvPHkjBLAouQctGJQvAE1NgnjdRAtL3qGoxEyhC2Ssdq1czuMui5uQSiHTF",
  "https://keypom.xyz/claim/v2.keypom.near#3PqxDHrxsGRnG8oTekMP96m9d5EnvVDixqcyZH7B3WY4rUFYykocEQdU2HLksWDtmuCqKjm2SeCvmzYw9kX4xmhn",
  "https://keypom.xyz/claim/v2.keypom.near#3ssZP5f5VCnJVbbZmieLkkbvFLzMxwjjGrZdw9E2UbPpaHZRbkz8UchtgoZRSBivz8Y7MTfWvet6iTXN3wSR5XLz",
  "https://keypom.xyz/claim/v2.keypom.near#5K9wuFvWmz6J1Motxr7QEsB5gF9ztc2kHpqmZdEjd3f31W5PUVetoKd8PiFrZVRC794A1Qf8QDwGVSFyKLNoUXx5",
  "https://keypom.xyz/claim/v2.keypom.near#5m1egiEpVkAVBYt1z189qeB4sRdW3Tgt76kXc1MXLE3jQwDnVw1qqFoVyWAsdcswQqLcxwApF27Qi9y81oiQtdzi",
  "https://keypom.xyz/claim/v2.keypom.near#4LfZUoysC3gXb2X6pG2oNk5zVAYQytz5E7v2LmchVQA5APPVG5d8xsbVyuEa63TUrwPk3ZBRTnzgYxaDVZjYSBL6",
  "https://keypom.xyz/claim/v2.keypom.near#4bhzW8qLDs6YTNynz3seUsbeqdBFYQkTn1rUMQ6feTqLmycdiQjeQ1ExMYBimGymYBLtLr7BKfCkezLPs2jaNucQ",
  "https://keypom.xyz/claim/v2.keypom.near#4b1BqSiC2GeUGtSd2mESPts1G61Mm58sAUqEenNSvuRYDw3WBqEt6PjzrvtYRhtEEckWeLP8uAbhmup57zsJxeRz",
  "https://keypom.xyz/claim/v2.keypom.near#3sU1BAM9wabhqQkEowHnHp53dAXFt3QdHA1UnWwS9YQGH5oPJRWetYpHRqr7bdesQX2fP95rDD2u3Ucjqz1J349w",
  "https://keypom.xyz/claim/v2.keypom.near#vPasAuSygeGnGFv4uBLKsiLpAGHHmyShRfjT2TW64JdsNKVWHh5PpCF5P8irF5qcNtez8XKcYrLjNdy8UPDVXMJ",
  "https://keypom.xyz/claim/v2.keypom.near#eSDpb7KhxGqjuXBYJwrPD1DDdtfUWnvBCGogkQajCLDuyhMLBmL4r7F96LfASuvDY1fFHNJCSNNooAjszNFWHJz",
  "https://keypom.xyz/claim/v2.keypom.near#5J4V3kzS6EK7cFUFm4exnCVuEZnSWnx3RGmH493TkChVjZnZLxykU4y3d51FJsqPq5xEgXngj1dAh2VMCAejPu64",
  "https://keypom.xyz/claim/v2.keypom.near#5cE1T1WXp7pKnTtgrKYhA5mECyZCYFWDwipTs1UfY8oDkxwbVWuBCNCxTEQ2goMiiJZZ4G8cuVT6PcJMV1wNMcez",
  "https://keypom.xyz/claim/v2.keypom.near#2RLTmsq54Yi5t9maiekTMVRaHK4bP1W7trvMiHzEqdbpnPUAH2XgLzW2iirMDXwdfKnjY3MUwL1K5bjEsU6X6GKd",
  "https://keypom.xyz/claim/v2.keypom.near#3ae5dymZSCkqiy1k9KJuazTaM5U85UqPnRSd6FC1ZmwKDBJ5ThYH2DXgcGaUXw6LonhzRdz7sxnYvcgMPrrw34YZ",
  "https://keypom.xyz/claim/v2.keypom.near#4twmhoStCaxik8Dt8ygSUvKoh8Hk9h2nNjMJ6boLk3oR7qqhvxg9XQgmHdgcN79eCT2qE3CqE6D6nBKaCRsgTTEm",
  "https://keypom.xyz/claim/v2.keypom.near#37w3QdsoiLzMQCDnvAaN5vpf86LC1uYNsCuzbJQ2QFwX35NVE6jChAT4ifWWtxffPKtDnub5K25ZM12y2SYW2Pcj",
  "https://keypom.xyz/claim/v2.keypom.near#rVYkJc9gZXmpL7q2Ntphf5WgWgKPYobguShuvhnk2caR4ik7FrApqNNQqjob3QVwZQ71bL3wAaLGmKroT9PDpxL",
  "https://keypom.xyz/claim/v2.keypom.near#3orZdjUGVXq9UFru8sMX2C9g89KmH23xUCakNnRA5uTwULHNNYAunduuXMK7JYwJ9WEvWTtVVw1Jcd9TWB88YJHY",
  "https://keypom.xyz/claim/v2.keypom.near#3yq5AyUEKntbg9uw4fYKzujLAPSEUE4k1uMV4csjXvPW1CyVxWivqFAjpfg7FEryu5g6HptENuARczaQMwwru4VN",
  "https://keypom.xyz/claim/v2.keypom.near#4YEYBF4mwJmPUsYEaTnfG2HRjUEzhuFtciKTgiWy9rWsPhESSVuoZdaGXhytgX7dSRF2g51xHsWHVfFYMmsbVhPU",
  "https://keypom.xyz/claim/v2.keypom.near#2aq3YsWWgzvgfeukbHzw8bpmXFGAzw4qvcHKRuPtRxE8sjXniPJTn8cuGzUCDqSquh4UrLxEhoWHEB8wH6SX662P",
  "https://keypom.xyz/claim/v2.keypom.near#cYdKoXsZ42DqacBg1SzSQnLYZ5HRhf9NHLE75C5qYNWCnLGXRcx7xaxFqCX2jDpqXGB7N1tZa8V1jst88dKM3FK",
  "https://keypom.xyz/claim/v2.keypom.near#RqkEWeYfxphZUPbGLBbcJUBNqmv158T8XK4kZKLuaPtJzuYYAoERDS7PQL2JAAGmfSFcWiKosk3B9XCNKMHuBJC",
  "https://keypom.xyz/claim/v2.keypom.near#CuMcuVjkDTAx6pN5QUywTRqVPQH5dHuaGJGAY5Zc54BK6re1TAsxWLCGrvhQNgHrXvsAu9ahgkWT96keUKt7zDE",
  "https://keypom.xyz/claim/v2.keypom.near#45DhcyEuzEFuqKaUnWL8SRy2RD5JUfsdjFxwPCoTM1g2knozTKLWrrvQdQmo1r1w56sJE5FPfWFzCi2uGPVg65ea",
  "https://keypom.xyz/claim/v2.keypom.near#4LR4jS1n4NZy7xPhVjUJMWDn19o14rxkawEigjoQ4NePc4THDXYMmMapzKv16MZXshjoE7KJ7siE43ZqLAjj4G1J",
  "https://keypom.xyz/claim/v2.keypom.near#25Mckbn7jnCpZwYKdavAbxAuJ27Un6wueSmgfidi3kViWGCd5uLWLexc8daDTFKR98dEPqyWg5K1brAmVXSjJTvg",
  "https://keypom.xyz/claim/v2.keypom.near#3PdhCBWXVikQSGhKCK2JnicYyra4FViGMbeURHs9V6i7EyGhJLMLvi6bpjvgseZG1fgTaUdXftj8KwCHvc1dET58",
]

// Initialize linkdrops in KV store if not already present
export async function initializeLinkdrops() {
  try {
    console.log("Attempting to initialize linkdrops...")
    const existing = await kv.get("linkdrops")
    if (!existing) {
      console.log("No existing linkdrops found. Creating new linkdrops...")
      const linkdrops = LINKDROPS.map((url, index) => ({
        id: index + 1,
        url,
        claimed: false,
      }))
      await kv.set("linkdrops", linkdrops)
      await kv.set("linkdrop_count", LINKDROPS.length)
      await kv.set("claimed_count", 0)
      console.log("Linkdrops initialized successfully.")
    } else {
      console.log("Existing linkdrops found. Skipping initialization.")
    }
  } catch (error) {
    console.error("Failed to initialize linkdrops:", error)
    if (error instanceof Error) {
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }
    // If KV is not set up, we'll use in-memory storage as a fallback
    console.log("Using in-memory fallback for linkdrops.")
    globalThis.linkdrops = LINKDROPS.map((url, index) => ({
      id: index + 1,
      url,
      claimed: false,
    }))
    globalThis.linkdrop_count = LINKDROPS.length
    globalThis.claimed_count = 0
  }
}

// Get next available linkdrop
export async function getNextAvailableLinkdrop(): Promise<LinkDrop | null> {
  try {
    const claimedCount = (await kv.get("claimed_count")) as number
    const totalCount = (await kv.get("linkdrop_count")) as number

    if (claimedCount >= totalCount) {
      return null
    }

    const linkdrops: LinkDrop[] = (await kv.get("linkdrops")) || []
    const availableLinkdrop = linkdrops.find((l) => !l.claimed)

    if (!availableLinkdrop) {
      return null
    }

    return availableLinkdrop
  } catch (error) {
    console.error("Failed to get next available linkdrop:", error)
    // Fallback to in-memory storage
    if (globalThis.claimed_count >= globalThis.linkdrop_count) {
      return null
    }

    const availableLinkdrop = globalThis.linkdrops.find((l: LinkDrop) => !l.claimed)
    return availableLinkdrop || null
  }
}

// Mark linkdrop as claimed
export async function markLinkdropAsClaimed(id: number, walletAddress: string): Promise<boolean> {
  try {
    const linkdrops: LinkDrop[] = (await kv.get("linkdrops")) || []
    const index = linkdrops.findIndex((l) => l.id === id)

    if (index === -1) return false

    linkdrops[index] = {
      ...linkdrops[index],
      claimed: true,
      claimedBy: walletAddress,
      claimedAt: new Date(),
    }

    await kv.set("linkdrops", linkdrops)
    await kv.incr("claimed_count")
    return true
  } catch (error) {
    console.error("Failed to mark linkdrop as claimed:", error)
    // Fallback to in-memory storage
    const index = globalThis.linkdrops.findIndex((l: LinkDrop) => l.id === id)
    if (index === -1) return false

    globalThis.linkdrops[index] = {
      ...globalThis.linkdrops[index],
      claimed: true,
      claimedBy: walletAddress,
      claimedAt: new Date(),
    }
    globalThis.claimed_count++
    return true
  }
}

// Get linkdrop stats
export async function getLinkdropStats() {
  try {
    const totalCount = (await kv.get("linkdrop_count")) as number
    const claimedCount = (await kv.get("claimed_count")) as number
    return {
      total: totalCount,
      claimed: claimedCount,
      available: totalCount - claimedCount,
    }
  } catch (error) {
    console.error("Failed to get linkdrop stats:", error)
    // Fallback to in-memory storage
    return {
      total: globalThis.linkdrop_count,
      claimed: globalThis.claimed_count,
      available: globalThis.linkdrop_count - globalThis.claimed_count,
    }
  }
}

