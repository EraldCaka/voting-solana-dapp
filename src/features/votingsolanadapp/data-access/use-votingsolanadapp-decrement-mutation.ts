import { VotingsolanadappAccount, getDecrementInstruction } from '@project/anchor'
import { useMutation } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { toastTx } from '@/components/toast-tx'
import { useVotingsolanadappAccountsInvalidate } from './use-votingsolanadapp-accounts-invalidate'

export function useVotingsolanadappDecrementMutation({
  account,
  votingsolanadapp,
}: {
  account: UiWalletAccount
  votingsolanadapp: VotingsolanadappAccount
}) {
  const invalidateAccounts = useVotingsolanadappAccountsInvalidate()
  const signer = useWalletUiSigner({ account })
  const signAndSend = useWalletUiSignAndSend()

  return useMutation({
    mutationFn: async () => await signAndSend(getDecrementInstruction({ votingsolanadapp: votingsolanadapp.address }), signer),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
