import { BankrunProvider, startAnchor } from 'anchor-bankrun'
import { Keypair, PublicKey } from '@solana/web3.js'
import * as anchor from '@coral-xyz/anchor'
import { BN, Program } from '@coral-xyz/anchor'
import { Voting } from '../target/types/voting'

const IDL = require('../target/idl/voting.json')
const votingAddress = new PublicKey('Count3AcZucFDPSFBAeHkQ6AvttieKUkyJ8HiQGhQwe')

describe('Voting', () => {
  it('Initialize Poll', async () => {
    const context = await startAnchor('', [{ name: 'voting', programId: votingAddress }], [])
    const provider = new BankrunProvider(context)
    const votingProgram = new Program<Voting>(IDL, provider)

    await votingProgram.methods
      .initializePoll(
        new anchor.BN(1),
        'Will Albania join the Eu By 2028?',
        new anchor.BN(0),
        new anchor.BN(1865614727),
      )
      .rpc()

    const [pollAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 8)],
      votingAddress,
    )
    const poll = await votingProgram.account.poll.fetch(pollAddress)
    console.log(poll)
    expect(poll.pollId.toNumber()).toEqual(1)
    expect(poll.description).toEqual('Will Albania join the Eu By 2028?')
    expect(poll.pollStart.toNumber()).toBeLessThan(poll.pollEnd.toNumber())
  })
})
