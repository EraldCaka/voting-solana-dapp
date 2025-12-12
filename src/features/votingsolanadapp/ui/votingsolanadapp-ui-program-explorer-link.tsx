import { VOTINGSOLANADAPP_PROGRAM_ADDRESS } from '@project/anchor'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { ellipsify } from '@wallet-ui/react'

export function VotingsolanadappUiProgramExplorerLink() {
  return <AppExplorerLink address={VOTINGSOLANADAPP_PROGRAM_ADDRESS} label={ellipsify(VOTINGSOLANADAPP_PROGRAM_ADDRESS)} />
}
