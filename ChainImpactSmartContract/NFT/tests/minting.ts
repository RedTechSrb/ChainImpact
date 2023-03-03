import * as anchor from '@project-serum/anchor'
import { Program, Wallet } from '@project-serum/anchor'
import { Minting } from '../target/types/minting'
import { TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, createInitializeMintInstruction, MINT_SIZE } from '@solana/spl-token'
const { SystemProgram } = anchor.web3


function mintAndSendNFT (
  user_public_key: string, 
  metadata_uri: string
  ): void {
    describe('mint_nft', () => {
      const provider = anchor.AnchorProvider.env();
      const wallet = provider.wallet as Wallet;
      const user_wallet = new anchor.web3.PublicKey(
        user_public_key
      );
      anchor.setProvider(provider);
      const program = anchor.workspace.Minting as Program<Minting>
    
      it("Is initialized!", async () => {
    
        const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
          "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        );
        const lamports: number =
          await program.provider.connection.getMinimumBalanceForRentExemption(
            MINT_SIZE
          );
        const getMetadata = async (
          mint: anchor.web3.PublicKey
        ): Promise<anchor.web3.PublicKey> => {
          return (
            await anchor.web3.PublicKey.findProgramAddress(
              [
                Buffer.from("metadata"),
                TOKEN_METADATA_PROGRAM_ID.toBuffer(),
                mint.toBuffer(),
              ],
              TOKEN_METADATA_PROGRAM_ID
            )
          )[0];
        };
    
        const getMasterEdition = async (
          mint: anchor.web3.PublicKey
        ): Promise<anchor.web3.PublicKey> => {
          return (
            await anchor.web3.PublicKey.findProgramAddress(
              [
                Buffer.from("metadata"),
                TOKEN_METADATA_PROGRAM_ID.toBuffer(),
                mint.toBuffer(),
                Buffer.from("edition"),
              ],
              TOKEN_METADATA_PROGRAM_ID
            )
          )[0];
        };
    
        const mintKey: anchor.web3.Keypair = anchor.web3.Keypair.generate();
        const NftTokenAccount = await getAssociatedTokenAddress(
          mintKey.publicKey,
          user_wallet,
        );
        // console.log("NFT issued to: ", user_public_key);
    
        const mint_tx = new anchor.web3.Transaction().add(
          anchor.web3.SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: mintKey.publicKey,
            space: MINT_SIZE,
            programId: TOKEN_PROGRAM_ID,
            lamports,
          }),
          createInitializeMintInstruction(
            mintKey.publicKey,
            0,
            wallet.publicKey,
            wallet.publicKey
          ),
          createAssociatedTokenAccountInstruction(
            wallet.publicKey,
            NftTokenAccount,
            user_wallet,
            mintKey.publicKey
          )
        );
    
        const res = await program.provider.sendAndConfirm(mint_tx, [mintKey]);
        // console.log(
        //   await program.provider.connection.getParsedAccountInfo(mintKey.publicKey)
        // );
    
        // console.log("Account: ", res);
        // console.log("NFT address: ", mintKey.publicKey.toString());
        // console.log("Our wallet: ", wallet.publicKey.toString());
    
        const metadataAddress = await getMetadata(mintKey.publicKey);
        const masterEdition = await getMasterEdition(mintKey.publicKey);
    
        // console.log("Metadata address: ", metadataAddress.toBase58());
        // console.log("Master edition address: ", masterEdition.toBase58());
    
        const tx = await program.methods.mintNft(
          wallet.publicKey,
          metadata_uri,
          "ChainImpactNFT",
        )
          .accounts({
            mintAuthority: wallet.publicKey,
            mint: mintKey.publicKey,
            tokenAccount: NftTokenAccount,
            tokenProgram: TOKEN_PROGRAM_ID,
            metadata: metadataAddress,
            tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
            payer: wallet.publicKey,
            systemProgram: SystemProgram.programId,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            masterEdition: masterEdition,
          },
          )
          .rpc();
        // console.log("Transaction signature:", tx);
      });
    });
  }

mintAndSendNFT(
  "qM1bJMbdwqtJGz8R5hQmw86xooCvfkjpnzUXqbJxbTT", 
  "https://raw.githubusercontent.com/urosm561/MintAndSendNFT/main/metadatashort.txt"
);