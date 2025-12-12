import { VotingsolanadappAccount } from '@project/anchor'
import { ellipsify, UiWalletAccount } from '@wallet-ui/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { VotingsolanadappUiButtonClose } from './votingsolanadapp-ui-button-close'
import { VotingsolanadappUiButtonDecrement } from './votingsolanadapp-ui-button-decrement'
import { VotingsolanadappUiButtonIncrement } from './votingsolanadapp-ui-button-increment'
import { VotingsolanadappUiButtonSet } from './votingsolanadapp-ui-button-set'

export function VotingsolanadappUiCard({ account, votingsolanadapp }: { account: UiWalletAccount; votingsolanadapp: VotingsolanadappAccount }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Votingsolanadapp: {votingsolanadapp.data.count}</CardTitle>
        <CardDescription>
          Account: <AppExplorerLink address={votingsolanadapp.address} label={ellipsify(votingsolanadapp.address)} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 justify-evenly">
          <VotingsolanadappUiButtonIncrement account={account} votingsolanadapp={votingsolanadapp} />
          <VotingsolanadappUiButtonSet account={account} votingsolanadapp={votingsolanadapp} />
          <VotingsolanadappUiButtonDecrement account={account} votingsolanadapp={votingsolanadapp} />
          <VotingsolanadappUiButtonClose account={account} votingsolanadapp={votingsolanadapp} />
        </div>
      </CardContent>
    </Card>
  )
}
