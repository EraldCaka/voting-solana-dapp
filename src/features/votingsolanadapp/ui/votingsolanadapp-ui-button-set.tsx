import { VotingsolanadappAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useVotingsolanadappSetMutation } from '@/features/votingsolanadapp/data-access/use-votingsolanadapp-set-mutation'

export function VotingsolanadappUiButtonSet({ account, votingsolanadapp }: { account: UiWalletAccount; votingsolanadapp: VotingsolanadappAccount }) {
  const setMutation = useVotingsolanadappSetMutation({ account, votingsolanadapp })

  return (
    <Button
      variant="outline"
      onClick={() => {
        const value = window.prompt('Set value to:', votingsolanadapp.data.count.toString() ?? '0')
        if (!value || parseInt(value) === votingsolanadapp.data.count || isNaN(parseInt(value))) {
          return
        }
        return setMutation.mutateAsync(parseInt(value))
      }}
      disabled={setMutation.isPending}
    >
      Set
    </Button>
  )
}
