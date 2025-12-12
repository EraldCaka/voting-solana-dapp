import { VotingsolanadappAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'
import { useVotingsolanadappIncrementMutation } from '../data-access/use-votingsolanadapp-increment-mutation'

export function VotingsolanadappUiButtonIncrement({ account, votingsolanadapp }: { account: UiWalletAccount; votingsolanadapp: VotingsolanadappAccount }) {
  const incrementMutation = useVotingsolanadappIncrementMutation({ account, votingsolanadapp })

  return (
    <Button variant="outline" onClick={() => incrementMutation.mutateAsync()} disabled={incrementMutation.isPending}>
      Increment
    </Button>
  )
}
