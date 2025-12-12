import { VotingsolanadappAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useVotingsolanadappCloseMutation } from '@/features/votingsolanadapp/data-access/use-votingsolanadapp-close-mutation'

export function VotingsolanadappUiButtonClose({ account, votingsolanadapp }: { account: UiWalletAccount; votingsolanadapp: VotingsolanadappAccount }) {
  const closeMutation = useVotingsolanadappCloseMutation({ account, votingsolanadapp })

  return (
    <Button
      variant="destructive"
      onClick={() => {
        if (!window.confirm('Are you sure you want to close this account?')) {
          return
        }
        return closeMutation.mutateAsync()
      }}
      disabled={closeMutation.isPending}
    >
      Close
    </Button>
  )
}
