import { VotingsolanadappUiCard } from './votingsolanadapp-ui-card'
import { useVotingsolanadappAccountsQuery } from '@/features/votingsolanadapp/data-access/use-votingsolanadapp-accounts-query'
import { UiWalletAccount } from '@wallet-ui/react'

export function VotingsolanadappUiList({ account }: { account: UiWalletAccount }) {
  const votingsolanadappAccountsQuery = useVotingsolanadappAccountsQuery()

  if (votingsolanadappAccountsQuery.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  if (!votingsolanadappAccountsQuery.data?.length) {
    return (
      <div className="text-center">
        <h2 className={'text-2xl'}>No accounts</h2>
        No accounts found. Initialize one to get started.
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {votingsolanadappAccountsQuery.data?.map((votingsolanadapp) => (
        <VotingsolanadappUiCard account={account} key={votingsolanadapp.address} votingsolanadapp={votingsolanadapp} />
      ))}
    </div>
  )
}
