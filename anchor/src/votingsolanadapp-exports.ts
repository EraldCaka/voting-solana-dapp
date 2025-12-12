// Here we export some useful types and functions for interacting with the Anchor program.
import { Account, getBase58Decoder, SolanaClient } from 'gill'
import { getProgramAccountsDecoded } from './helpers/get-program-accounts-decoded'
import { Votingsolanadapp, VOTINGSOLANADAPP_DISCRIMINATOR, VOTINGSOLANADAPP_PROGRAM_ADDRESS, getVotingsolanadappDecoder } from './client/js'
import VotingsolanadappIDL from '../target/idl/votingsolanadapp.json'

export type VotingsolanadappAccount = Account<Votingsolanadapp, string>

// Re-export the generated IDL and type
export { VotingsolanadappIDL }

export * from './client/js'

export function getVotingsolanadappProgramAccounts(rpc: SolanaClient['rpc']) {
  return getProgramAccountsDecoded(rpc, {
    decoder: getVotingsolanadappDecoder(),
    filter: getBase58Decoder().decode(VOTINGSOLANADAPP_DISCRIMINATOR),
    programAddress: VOTINGSOLANADAPP_PROGRAM_ADDRESS,
  })
}
