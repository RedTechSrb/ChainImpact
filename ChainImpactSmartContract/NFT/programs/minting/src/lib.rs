use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke;
use anchor_spl::token;
use anchor_spl::token::{MintTo, Token};
use mpl_token_metadata::instruction::{create_master_edition_v3, create_metadata_accounts_v3};

declare_id!("8mKbQKVmhMM3PosgNgHfUwTT3jjAg4eE9KNk1Zh8um7q");

#[program]
pub mod minting {
    use super::*;

    pub fn mint_nft(
        ctx: Context<MintNFT>,
        creator_key: Pubkey,  // This would be the owner of the NFT (because we are technically issuing it from our own wallet)
        uri: String,
        title: String,
    ) -> Result<()> {

        let cpi_accounts = MintTo {
            mint: ctx.accounts.mint.to_account_info(), // This account mints the NFT
            to: ctx.accounts.token_account.to_account_info(), // NFT will be issued to this account
            authority: ctx.accounts.payer.to_account_info(),
        };
 
        let cpi_program = ctx.accounts.token_program.to_account_info();

        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);

        token::mint_to(cpi_ctx, 1)?;
        let account_info = vec![
            ctx.accounts.metadata.to_account_info(),
            ctx.accounts.mint.to_account_info(),
            ctx.accounts.mint_authority.to_account_info(),
            ctx.accounts.payer.to_account_info(),
            ctx.accounts.token_metadata_program.to_account_info(),
            ctx.accounts.token_program.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
            ctx.accounts.rent.to_account_info(),
        ];

        // Ownership shares of NFT creators (only us in this case)
        let creator = vec![
            mpl_token_metadata::state::Creator {
                address: creator_key,
                verified: false,
                share: 100,
            },
        ];

        let symbol = std::string::ToString::to_string("symb");
        invoke(
            &create_metadata_accounts_v3(
                ctx.accounts.token_metadata_program.key(), // program_id
                ctx.accounts.metadata.key(), // metadata_account
                ctx.accounts.mint.key(), // mint
                ctx.accounts.mint_authority.key(), // mint_authority
                ctx.accounts.payer.key(), // payer
                ctx.accounts.payer.key(), // update_authority
                title, // name
                symbol, // symbol
                uri, // uri
                Some(creator), //creators
                1, //seller_fee_basis_points
                true, // update_authority_is_signer
                false, // is_mutable
                None, // collection
                None, // uses
                None, // collection_details
            ),
            account_info.as_slice(),
        )?;

        let master_edition_infos = vec![
            ctx.accounts.master_edition.to_account_info(),
            ctx.accounts.mint.to_account_info(),
            ctx.accounts.mint_authority.to_account_info(),
            ctx.accounts.payer.to_account_info(),
            ctx.accounts.metadata.to_account_info(),
            ctx.accounts.token_metadata_program.to_account_info(),
            ctx.accounts.token_program.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
            ctx.accounts.rent.to_account_info(),
        ];

        invoke(
            &create_master_edition_v3( // Minting the NFT
                ctx.accounts.token_metadata_program.key(), // program_id
                ctx.accounts.master_edition.key(), // edition
                ctx.accounts.mint.key(), // mint
                ctx.accounts.payer.key(), // update_authority
                ctx.accounts.mint_authority.key(), // mint_authority
                ctx.accounts.metadata.key(), // metadata
                ctx.accounts.payer.key(), // payer
                Some(0), // max_supply
            ),
            master_edition_infos.as_slice(),
        )?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct MintNFT<'info> {
    #[account(mut)]
    pub mint_authority: Signer<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account (this comment has to exist whenever we use UncheckedAccount otherwise it won't compile)
    #[account(mut)]
    pub mint: UncheckedAccount<'info>,
    pub token_program: Program<'info, Token>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    pub metadata: UncheckedAccount<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    pub token_account: UncheckedAccount<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub token_metadata_program: UncheckedAccount<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    pub payer: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub rent: AccountInfo<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    pub master_edition: UncheckedAccount<'info>,
}