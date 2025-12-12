import { VotingsolanadappAccount, getIncrementInstruction } from '@project/anchor'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { useMutation } from '@tanstack/react-query'
import { toastTx } from '@/components/toast-tx'
import { useVotingsolanadappAccountsInvalidate } from './use-votingsolanadapp-accounts-invalidate'

export function useVotingsolanadappIncrementMutation({
  account,
  votingsolanadapp,
}: {
  account: UiWalletAccount
  votingsolanadapp: VotingsolanadappAccount
}) {
  const invalidateAccounts = useVotingsolanadappAccountsInvalidate()
  const signAndSend = useWalletUiSignAndSend()
  const signer = useWalletUiSigner({ account })

  return useMutation({
    mutationFn: async () => await signAndSend(getIncrementInstruction({ votingsolanadapp: votingsolanadapp.address }), signer),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
