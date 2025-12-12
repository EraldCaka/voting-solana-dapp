import { useQueryClient } from '@tanstack/react-query'
import { useVotingsolanadappAccountsQueryKey } from './use-votingsolanadapp-accounts-query-key'

export function useVotingsolanadappAccountsInvalidate() {
  const queryClient = useQueryClient()
  const queryKey = useVotingsolanadappAccountsQueryKey()

  return () => queryClient.invalidateQueries({ queryKey })
}
