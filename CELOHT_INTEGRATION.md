# CeloHT Integration

## Current state

CeloHT is intended to be a payment provider for CELO and USDm on Celo. The available Matchids sources contain no verified CeloHT endpoint, API contract, smart contract address, ABI, RPC configuration, or transaction lookup procedure.

The provider boundary is `src/lib/payments/providers/CeloHTProvider.ts`. It currently returns `isConfigured() === false` unconditionally. Environment variables alone do not enable it. Payment intent routes return `503`, no payment or donation records are created, and no frontend action can mark a transaction successful.

## Required before implementation

Obtain official integration documentation covering:

- Intent creation and supported purpose/amount/currency fields.
- CELO and USDm token identifiers and supported network(s).
- Signed callback/webhook format, signing key rotation, and replay protection.
- Transaction lookup/finality rules and refund/cancellation behavior.
- Sandbox/testnet credentials and a test procedure.

Do not add contract addresses, APIs, or credentials from assumptions. Keep provider-specific behavior inside the CeloHT adapter and verify every transaction on the server before granting book access or confirming a donation.

## Configuration

Set `CELOHT_API_BASE_URL`, `CELOHT_API_KEY`, `CELOHT_NETWORK`, and any verified webhook secret only after CeloHT supplies the corresponding real values. Secrets must remain server-side. The current adapter remains unavailable until its implementation and tests exist, even if those environment values are present.

## Verification gate

Before enabling CeloHT, add unit tests for request validation and signature/replay handling, provider integration tests against the official sandbox, and end-to-end tests proving that invalid or unfinalized transactions never mark an order or donation confirmed.