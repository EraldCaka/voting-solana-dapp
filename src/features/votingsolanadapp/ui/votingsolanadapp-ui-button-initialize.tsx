import { Button } from '@/components/ui/button'
import { UiWalletAccount } from '@wallet-ui/react'

import { useVotingsolanadappInitializeMutation } from '@/features/votingsolanadapp/data-access/use-votingsolanadapp-initialize-mutation'

export function VotingsolanadappUiButtonInitialize({ account }: { account: UiWalletAccount }) {
  const mutationInitialize = useVotingsolanadappInitializeMutation({ account })

  return (
    <Button onClick={() => mutationInitialize.mutateAsync()} disabled={mutationInitialize.isPending}>
      Initialize Votingsolanadapp {mutationInitialize.isPending && '...'}
    </Button>
  )
}
