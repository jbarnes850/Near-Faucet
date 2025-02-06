# NEAR Faucet

A faucet application for distributing NEAR tokens for product experiments.

## Features

- Token distribution for testnet
- Rate limiting
- User-friendly interface
- Secure token distribution

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Vercel KV for storage
- Vercel for deployment

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   vercel env pull .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

The following environment variables are required:

- `KV_URL`: Redis connection URL
- `KV_REST_API_URL`: REST API endpoint
- `KV_REST_API_TOKEN`: Full access token
- `KV_REST_API_READ_ONLY_TOKEN`: Read-only token

## Deployment

The application is automatically deployed to Vercel when changes are pushed to the main branch.

Production URL: https://near-faucet-kappa.vercel.app