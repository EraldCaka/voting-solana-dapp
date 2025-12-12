import {
  Blockhash,
  createSolanaClient,
  createTransaction,
  generateKeyPairSigner,
  Instruction,
  isSolanaError,
  KeyPairSigner,
  signTransactionMessageWithSigners,
} from 'gill'
import {
  fetchVotingsolanadapp,
  getCloseInstruction,
  getDecrementInstruction,
  getIncrementInstruction,
  getInitializeInstruction,
  getSetInstruction,
} from '../src'
// @ts-ignore error TS2307 suggest setting `moduleResolution` but this is already configured
import { loadKeypairSignerFromFile } from 'gill/node'

const { rpc, sendAndConfirmTransaction } = createSolanaClient({ urlOrMoniker: process.env.ANCHOR_PROVIDER_URL! })

describe('votingsolanadapp', () => {
  let payer: KeyPairSigner
  let votingsolanadapp: KeyPairSigner

  beforeAll(async () => {
    votingsolanadapp = await generateKeyPairSigner()
    payer = await loadKeypairSignerFromFile(process.env.ANCHOR_WALLET!)
  })

  it('Initialize Votingsolanadapp', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getInitializeInstruction({ payer: payer, votingsolanadapp: votingsolanadapp })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSER
    const currentVotingsolanadapp = await fetchVotingsolanadapp(rpc, votingsolanadapp.address)
    expect(currentVotingsolanadapp.data.count).toEqual(0)
  })

  it('Increment Votingsolanadapp', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getIncrementInstruction({
      votingsolanadapp: votingsolanadapp.address,
    })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchVotingsolanadapp(rpc, votingsolanadapp.address)
    expect(currentCount.data.count).toEqual(1)
  })

  it('Increment Votingsolanadapp Again', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getIncrementInstruction({ votingsolanadapp: votingsolanadapp.address })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchVotingsolanadapp(rpc, votingsolanadapp.address)
    expect(currentCount.data.count).toEqual(2)
  })

  it('Decrement Votingsolanadapp', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getDecrementInstruction({
      votingsolanadapp: votingsolanadapp.address,
    })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchVotingsolanadapp(rpc, votingsolanadapp.address)
    expect(currentCount.data.count).toEqual(1)
  })

  it('Set votingsolanadapp value', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getSetInstruction({ votingsolanadapp: votingsolanadapp.address, value: 42 })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchVotingsolanadapp(rpc, votingsolanadapp.address)
    expect(currentCount.data.count).toEqual(42)
  })

  it('Set close the votingsolanadapp account', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getCloseInstruction({
      payer: payer,
      votingsolanadapp: votingsolanadapp.address,
    })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    try {
      await fetchVotingsolanadapp(rpc, votingsolanadapp.address)
    } catch (e) {
      if (!isSolanaError(e)) {
        throw new Error(`Unexpected error: ${e}`)
      }
      expect(e.message).toEqual(`Account not found at address: ${votingsolanadapp.address}`)
    }
  })
})

// Helper function to keep the tests DRY
let latestBlockhash: Awaited<ReturnType<typeof getLatestBlockhash>> | undefined
async function getLatestBlockhash(): Promise<Readonly<{ blockhash: Blockhash; lastValidBlockHeight: bigint }>> {
  if (latestBlockhash) {
    return latestBlockhash
  }
  return await rpc
    .getLatestBlockhash()
    .send()
    .then(({ value }) => value)
}
async function sendAndConfirm({ ix, payer }: { ix: Instruction; payer: KeyPairSigner }) {
  const tx = createTransaction({
    feePayer: payer,
    instructions: [ix],
    version: 'legacy',
    latestBlockhash: await getLatestBlockhash(),
  })
  const signedTransaction = await signTransactionMessageWithSigners(tx)
  return await sendAndConfirmTransaction(signedTransaction)
}
