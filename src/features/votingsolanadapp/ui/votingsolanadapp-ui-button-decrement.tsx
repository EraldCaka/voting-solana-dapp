import { VotingsolanadappAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useVotingsolanadappDecrementMutation } from '../data-access/use-votingsolanadapp-decrement-mutation'

export function VotingsolanadappUiButtonDecrement({ account, votingsolanadapp }: { account: UiWalletAccount; votingsolanadapp: VotingsolanadappAccount }) {
  const decrementMutation = useVotingsolanadappDecrementMutation({ account, votingsolanadapp })

  return (
    <Button variant="outline" onClick={() => decrementMutation.mutateAsync()} disabled={decrementMutation.isPending}>
      Decrement
    </Button>
  )
}
