# CeloHT Integration

## What CeloHT is

CeloHT is a dapp that lets people send and receive **CELO** and **USDm** on
the **Celo blockchain**. In Matchids, CeloHT is treated as a Web3 payment
provider — one option among several, alongside traditional card payments —
for both premium book purchases and Give Back donations.

## Where it lives in the codebase

- `src/lib/payments/providers/CeloHTProvider.ts` — implements the shared
  `PaymentProvider` interface (`src/lib/payments/types.ts`).
- `src/app/api/payments/celoht/route.ts` — backend route that creates a
  CeloHT payment intent.
- `src/app/api/payments/webhook/route.ts` — shared confirmation endpoint;
  CeloHT transactions are verified here (or via a CeloHT-specific callback)
  before Matchids treats a purchase or donation as paid.

## What is real vs. what is a placeholder

Nothing invented: no contract address, ABI, RPC endpoint, or CeloHT API
route appears anywhere in this repository. `CeloHTProvider.isConfigured()`
checks for `CELOHT_API_BASE_URL` and `CELOHT_API_KEY` (see `.env.example`)
— until both are set to real values, the provider reports itself as not
configured, `createIntent()` throws a clear error, and the CeloHT payment
option is shown as "coming soon" in the UI rather than being offered as if
it works.

## What to do when the real integration details are available

1. Fill in `CELOHT_API_BASE_URL` and `CELOHT_API_KEY` in `.env`.
2. In `CeloHTProvider.createIntent()`, call CeloHT's real API to create a
   payment request for CELO or USDm, returning whatever the checkout UI
   needs to complete payment (address + amount, signed link, QR code,
   etc. — depends on what CeloHT's API actually returns).
3. In `CeloHTProvider.verifyTransaction()`, verify the transaction against
   the Celo blockchain or CeloHT's own verification endpoint. This must
   run server-side only.
4. Remove the "coming soon" label from the CeloHT option once end-to-end
   testing confirms a real payment can be created and verified.

No other file needs to change — `PaymentService` and checkout code already
treat CeloHT as a first-class provider.
