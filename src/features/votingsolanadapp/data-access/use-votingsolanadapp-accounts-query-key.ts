import { useSolana } from '@/components/solana/use-solana'

export function useVotingsolanadappAccountsQueryKey() {
  const { cluster } = useSolana()

  return ['votingsolanadapp', 'accounts', { cluster }]
}
