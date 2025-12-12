import { VotingsolanadappAccount, getSetInstruction } from '@project/anchor'
import { useMutation } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { toastTx } from '@/components/toast-tx'
import { useVotingsolanadappAccountsInvalidate } from './use-votingsolanadapp-accounts-invalidate'

export function useVotingsolanadappSetMutation({ account, votingsolanadapp }: { account: UiWalletAccount; votingsolanadapp: VotingsolanadappAccount }) {
  const invalidateAccounts = useVotingsolanadappAccountsInvalidate()
  const signAndSend = useWalletUiSignAndSend()
  const signer = useWalletUiSigner({ account })

  return useMutation({
    mutationFn: async (value: number) =>
      await signAndSend(
        getSetInstruction({
          votingsolanadapp: votingsolanadapp.address,
          value,
        }),
        signer,
      ),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
