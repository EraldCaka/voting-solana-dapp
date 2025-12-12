#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("Count3AcZucFDPSFBAeHkQ6AvttieKUkyJ8HiQGhQwe");

#[program]
pub mod votingsolanadapp {
    use super::*;

    pub fn close(_ctx: Context<CloseVotingsolanadapp>) -> Result<()> {
        Ok(())
    }

    pub fn decrement(ctx: Context<Update>) -> Result<()> {
        ctx.accounts.votingsolanadapp.count = ctx.accounts.votingsolanadapp.count.checked_sub(1).unwrap();
        Ok(())
    }

    pub fn increment(ctx: Context<Update>) -> Result<()> {
        ctx.accounts.votingsolanadapp.count = ctx.accounts.votingsolanadapp.count.checked_add(1).unwrap();
        Ok(())
    }

    pub fn initialize(_ctx: Context<InitializeVotingsolanadapp>) -> Result<()> {
        Ok(())
    }

    pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
        ctx.accounts.votingsolanadapp.count = value.clone();
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeVotingsolanadapp<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
  init,
  space = 8 + Votingsolanadapp::INIT_SPACE,
  payer = payer
    )]
    pub votingsolanadapp: Account<'info, Votingsolanadapp>,
    pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseVotingsolanadapp<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
  mut,
  close = payer, // close account and return lamports to payer
    )]
    pub votingsolanadapp: Account<'info, Votingsolanadapp>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub votingsolanadapp: Account<'info, Votingsolanadapp>,
}

#[account]
#[derive(InitSpace)]
pub struct Votingsolanadapp {
    count: u8,
}
