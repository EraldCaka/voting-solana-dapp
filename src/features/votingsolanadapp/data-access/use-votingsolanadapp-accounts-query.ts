import { useSolana } from '@/components/solana/use-solana'
import { useQuery } from '@tanstack/react-query'
import { getVotingsolanadappProgramAccounts } from '@project/anchor'
import { useVotingsolanadappAccountsQueryKey } from './use-votingsolanadapp-accounts-query-key'

export function useVotingsolanadappAccountsQuery() {
  const { client } = useSolana()

  return useQuery({
    queryKey: useVotingsolanadappAccountsQueryKey(),
    queryFn: async () => await getVotingsolanadappProgramAccounts(client.rpc),
  })
}
