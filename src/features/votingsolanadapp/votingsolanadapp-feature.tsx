import { useSolana } from '@/components/solana/use-solana'
import { WalletDropdown } from '@/components/wallet-dropdown'
import { AppHero } from '@/components/app-hero'
import { VotingsolanadappUiButtonInitialize } from './ui/votingsolanadapp-ui-button-initialize'
import { VotingsolanadappUiList } from './ui/votingsolanadapp-ui-list'
import { VotingsolanadappUiProgramExplorerLink } from './ui/votingsolanadapp-ui-program-explorer-link'
import { VotingsolanadappUiProgramGuard } from './ui/votingsolanadapp-ui-program-guard'

export default function VotingsolanadappFeature() {
  const { account } = useSolana()

  return (
    <VotingsolanadappUiProgramGuard>
      <AppHero
        title="Votingsolanadapp"
        subtitle={
          account
            ? "Initialize a new votingsolanadapp onchain by clicking the button. Use the program's methods (increment, decrement, set, and close) to change the state of the account."
            : 'Select a wallet to run the program.'
        }
      >
        <p className="mb-6">
          <VotingsolanadappUiProgramExplorerLink />
        </p>
        {account ? (
          <VotingsolanadappUiButtonInitialize account={account} />
        ) : (
          <div style={{ display: 'inline-block' }}>
            <WalletDropdown />
          </div>
        )}
      </AppHero>
      {account ? <VotingsolanadappUiList account={account} /> : null}
    </VotingsolanadappUiProgramGuard>
  )
}
