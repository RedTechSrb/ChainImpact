import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  Button,
  Progress,
  TextInput,
  Modal,
  NumberInput,
  Grid,
  Title,
  Paper,
  Loader,
} from "@mantine/core";
import {
  clusterApiUrl,
  Commitment,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { Icon123, IconHeart } from "@tabler/icons";
import { useEffect, useState } from "react";
import { Project } from "../../models/Project";

import { NftStats } from "./NftStats";
import { Program, web3, BN, AnchorProvider, Idl } from "@project-serum/anchor";
import idl from "../../res/transactions/idl.json";
import * as anchor from "@project-serum/anchor";

import { Buffer } from "buffer";
import {
  createNewImpactor,
  getSpecificImpactor,
  getSpecificImpactorById,
} from "../../repositories/ImpactorRepository";
import { ImpactorWalletSearch } from "../../models/dto/request/ImpactorWalletSearch";
import {
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createInitializeMintInstruction,
  MINT_SIZE,
} from "@solana/spl-token";
import minting from "../../res/transactions/minting.json";
import Cookies from "universal-cookie";
import { useGetNextTierNFTs } from "../../repositories/NFTRepository";
import { indexes } from "../../res/images/indexes";
import { ImpactorIdSearch } from "../../models/dto/request/ImpactorIdSearch";
import { Impactor } from "../../models/Impactor";
import { useDisclosure } from "@mantine/hooks";
import { NFTNextTierResponse } from "../../models/dto/response/NFTNextTierResponse";
import { ProjectProgress } from "../companyComponents/ProjectProgress";
window.Buffer = Buffer;

type DisplayEncoding = "utf8" | "hex";
type PhantomEvent = "disconnect" | "connect" | "accountChanged";
type PhantomRequestMethod =
  | "connect"
  | "disconnect"
  | "signTransaction"
  | "signAllTransactions"
  | "signMessage";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}

type DonationSidebarProps = {
  project: Project;
  sidebarTop: number;
  walletKey: string;
  setWalletKey: any;
  cookies: Cookies;
};

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `${1}} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: "-0.25",
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `${1} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  image: {
    maxHeight: "240px",
    maxWidth: "320px",
  },

  icon: {
    marginRight: "5px",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

const programID = new PublicKey(idl.metadata.address);
const network = clusterApiUrl("devnet");

//Ovo odredjuje koliko se ceka da se validira transakcija
const opts: { preflightCommitment: Commitment } = {
  preflightCommitment: "singleGossip",
};

export default function DonationSidebar({
  project,
  sidebarTop,
  walletKey,
  setWalletKey,
  cookies,
}: DonationSidebarProps) {
  const { classes } = useStyles();
  const [open1, setOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState<any>(0);
  const [reasonableAmount, setReasonableAmount] = useState(true);
  const [transactionStatus, setTransactionStatus] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  let to: any = null;
  if (project?.charity?.wallet) to = new PublicKey(project?.charity?.wallet); // wallet of project for donating to

  // console.log("TOTO "+to)
  // const poreskaUprava = new PublicKey(
  //   cookies.get("ChainImpactWallet") // Chain Impact wallet
  // );

  // useEffect(() => {
  //   console.log(poreskaUprava)
  // }, [])

  const handleDonateClick = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  // const dataNft = {
  //   data: [
  //     {
  //       label: "Page views",
  //       stats: "456,578",
  //       progress: 65,
  //       color: "teal",
  //     },
  //     {
  //       label: "New users",
  //       stats: "2,550",
  //       progress: 72,
  //       color: "blue",
  //     },
  //   ],
  // };

  // const nextTierNftSearch = {
  //   projectId: project.id,
  //   wallet: cookies.get("wallet") ?? "asdf"
  // }
  // console.log(nextTierNftSearch)

  // const dataNftNew = useGetNextTierNFTs(nextTierNftSearch);
  // console.log(dataNftNew);

  let solana: any;
  console.log(transactionStatus);

  const connectWallet = async () => {
    // @ts-ignore
    const provider = getProviderConnect();

    // check if there is cookie containing a wallet
    let cookieWallet;
    let newUser;
    let response;
    if ((cookieWallet = cookies.get("wallet"))) {
      if (provider) {
        const resp = await provider.connect();
        return resp.publicKey;
      }
    }

    console.log(provider);
    if (provider) {
      try {
        const resp = await provider.connect();

        // put wallet in cookie for next 365 days
        cookies.set("wallet", resp.publicKey.toString(), { path: "/" });
        // if there is already impactor with this wallet, continue
        let impactor = getSpecificImpactor(
          new ImpactorWalletSearch(null, null, resp.publicKey.toString())
        );
        setWalletKey(resp.publicKey.toString());
        if (await impactor) {
          return resp.publicKey;
        }

        // if not, create new impactor with this wallet
        newUser = {
          wallet: resp.publicKey.toString(),
          type: 1,
          name: null,
          description: null,
          website: null,
          facebook: null,
          discord: null,
          twitter: null,
          instagram: null,
          imageurl: null,
          role: null,
        };

        createNewImpactor(newUser);
        return resp.publicKey;
      } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
      }
    } else {
      return;
    }
  };

  const getProviderConnect: any = () => {
    const anyWindow: any = window;
    const provider = anyWindow.phantom?.solana;
    return provider;
  };

  const getProvider: any = () => {
    const anyWindow: any = window;
    solana = anyWindow.phantom?.solana;
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(connection, solana, opts);
    return provider;
  };

  const companyTiers = [1000, 5000, 20000, 50000];
  const nonCompanyTiers = [50, 200, 1000, 5000];
  const [impactor, setImpactor] = useState<Impactor>();
  let impactorData: Promise<any>;
  const [dataNftNew, setDataNftNew] = useState<NFTNextTierResponse[]>([]);

  function setImpactorData() {
    impactorData = getSpecificImpactor(
      new ImpactorWalletSearch(null, null, walletKey)
    );
    impactorData.then((data) => {
      setImpactor(data);
    });
  }

  useEffect(() => {
    setImpactorData();
  }, []);

  useEffect(() => {
    setTransactionStatus("");
  }, [walletKey]);

  async function handleSubmit() {
    let skip = false;
    if (walletKey) setTransactionStatus("pending");
    else {
      skip = true;
    }

    try {
      await donateToProject();
      if (!skip) {
        if (donationAmount <= 0) {
          setTransactionStatus("You can't donate this amount");
        } else {
          // here comes the logic for potential NFT sending
          // first only message display (proper modal with images), only after you call the method
          const nft1: NFT = {
            tier: 1,
            user_type: 1,
            cause_type: "education",
          };
          mintAndSendNFT_v2(walletKey, nft1);
          const nft2: NFT = {
            tier: 1,
            user_type: 1,
            cause_type: "geneRAL",
          };
          mintAndSendNFT_v2(walletKey, nft2);
          setTransactionStatus("success");
          open();
          setOpen(false);
        }
      }
    } catch (error) {
      setTransactionStatus("failed");
      console.error(error);
    }
  }

  const donateToProject = async () => {
    if (!("phantom" in window)) {
      return;
    }
    try {
      let key: PublicKey;
      if (!cookies.get("wallet")) {
        key = await connectWallet();
        return;
      } else {
        key = await connectWallet();
      }
      console.log(key);
      const provider = getProvider();
      console.log("Amount donated:", donationAmount);
      const connection = new Connection(network, opts.preflightCommitment);
      const program = new Program(idl as Idl, programID, provider);
      let poreskaUprava: any;
      getSpecificImpactorById(new ImpactorIdSearch(null, null, 0)).then(
        (data) => {
          const obj: Impactor[] = JSON.parse(data);
          poreskaUprava = obj[0].wallet;
        }
      );
      let balance = (await connection.getBalance(to)) / web3.LAMPORTS_PER_SOL;
      console.log("Limun wealth: ", balance);
      console.log("Donating 0.1 SOL to Limun...");
      console.log(new PublicKey(cookies.get("wallet")), to, poreskaUprava);
      if (donationAmount <= 0 || isNaN(donationAmount)) {
        setReasonableAmount(false);
        return;
      } else {
        setReasonableAmount(true);
      }
      //provider = getProviderConnect();
      let ts = await program.rpc.transfer(
        new BN(donationAmount * web3.LAMPORTS_PER_SOL),
        {
          accounts: {
            user: key,
            receiver: to,
            feeCollector: poreskaUprava,
            systemProgram: SystemProgram.programId,
          },
        }
      );
      console.log("Transaction signature:", ts);
      balance = (await connection.getBalance(to)) / web3.LAMPORTS_PER_SOL;
      console.log("Limun wealth: ", balance);
    } catch (err) {
      console.error("Error in donating to Limun", err);
      throw err;
    }
  };

  class MyWallet {
    keypair: any;
    publicKey: any;
    constructor(secretKey: any) {
      this.keypair = Keypair.fromSecretKey(secretKey);
      this.publicKey = this.keypair.publicKey;
    }

    async signTransaction(transaction: any) {
      transaction.partialSign(this.keypair);
      return transaction;
    }

    async signAllTransactions(transactions: any) {
      transactions.forEach((transaction: any) => {
        this.signTransaction(transaction);
      });
      return transactions;
    }
  }

  async function mintAndSendNFT(
    user_public_key: string,
    metadata_uri: string,
    title: string,
    symbol: string
  ): Promise<void> {
    //const wallet = provider.wallet as Wallet;

    const user_wallet = new anchor.web3.PublicKey(user_public_key);
    const wallet = new MyWallet(new Uint8Array(indexes));
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(connection, wallet, opts);
    anchor.setProvider(provider);
    const programID = new PublicKey(minting.metadata.address);
    const program = new Program(minting as Idl, programID, provider);

    console.log(wallet.publicKey.toString());

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
    //const mintKey = anchor.web3.Keypair.fromSeed(SECRET_KEY);
    const NftTokenAccount = await getAssociatedTokenAddress(
      mintKey.publicKey,
      user_wallet
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
    // createSetAuthorityInstruction
    if (
      program !== undefined &&
      program.provider !== undefined &&
      program.provider.sendAndConfirm !== undefined
    ) {
      await program.provider.sendAndConfirm(mint_tx, [mintKey]);
    }
    // console.log(
    //   await program.provider.connection.getParsedAccountInfo(mintKey.publicKey)
    // );

    // console.log("Account: ", res);
    console.log("NFT address: ", mintKey.publicKey.toString());
    // console.log("Our wallet: ", wallet.publicKey.toString());

    const metadataAddress = await getMetadata(mintKey.publicKey);
    const masterEdition = await getMasterEdition(mintKey.publicKey);

    console.log("Metadata address: ", metadataAddress.toBase58());
    console.log("Master edition address: ", masterEdition.toBase58());
    console.log("MDU: ", metadata_uri);

    const tx = await program.rpc.mintNft(
      wallet.publicKey,
      metadata_uri,
      title,
      symbol,
      {
        accounts: {
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
      }
    );

    // const master_edition_public_key = new PublicKey(masterEdition.publicKey);

    // const change_authority_tx = new anchor.web3.Transaction().add(
    //   createSetAuthorityInstruction(
    //     TOKEN_PROGRAM_ID,
    //     mintKey.publicKey,
    //     master_edition_public_key,
    //     "FreezeAccount",
    //     wallet.publicKey,
    //     [],
    //   )
    // );

    // await program.provider.sendAndConfirm(change_authority_tx, [wallet, mintKey]);
  }

  interface NFT {
    tier: number;
    user_type: number;
    cause_type: string;
  }

  function mintAndSendNFT_v2(user_public_key: string, nft: NFT): void {
    let user: string = "Company";
    if (nft.user_type == 1) {
      user = "User";
    }
    const cause_type: string =
      nft.cause_type.charAt(0).toUpperCase() +
      nft.cause_type.slice(1).toLowerCase();
    const metadata_uri: string =
      "https://raw.githubusercontent.com/RedTechSrb/ChainImpact/master/ChainImpactSmartContract/NFT/NFTsMetadata/".concat(
        cause_type,
        user,
        nft.tier.toString(),
        ".json"
      );
    mintAndSendNFT(
      user_public_key,
      metadata_uri,
      cause_type.concat(" #", nft.tier.toString()),
      "CHAING"
    );
    //console.log(metadata_uri);
  }

  const nft: NFT = {
    tier: 1,
    user_type: 1,
    cause_type: "geneRAL",
  };

  // mintAndSendNFT_v2(
  //   "qM1bJMbdwqtJGz8R5hQmw86xooCvfkjpnzUXqbJxbTT",
  //   nft,
  // );

  return (
    <Card
      id="donation-sidebar"
      withBorder
      radius="md"
      className={classes.card}
      style={{ top: `${sidebarTop}px` }}
    >
      <Card.Section className={classes.imageSection}>
        <Image
          src={project.imageurl}
          alt="Project Image"
          className={classes.image}
        />
      </Card.Section>

      <Text size={"xl"} weight={500} mt="0" color={"#BBFD00"}>
        {project.name}
      </Text>
      <ProjectProgress
        projectData={project}
        mtVal={"lg"}
        mbVal={"0"}
      ></ProjectProgress>

      <Card.Section className={classes.section}>
        {/* <TextInput
          placeholder="Amount in USDC"
          label="Amount"
          //error="Wallet not connected, please press connect wallet"
          radius="lg"
          withAsterisk
        /> */}
        <Button
          radius="sm"
          style={{ flex: 1, width: "100%" }}
          mt="sm"
          onClick={handleDonateClick}
          size="lg"
        >
          Donate
        </Button>

        <Modal
          size={600}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          opened={opened}
          onClose={() => {
            close();
            setOpen(false);
          }}
          title="TRANSACTION SUCCESSFUL"
          centered
          withCloseButton
        >
          {transactionStatus === "success" && (
            <>
              <Text
                mt={10}
                color="#33860c"
                weight={700}
                pb={10}
                align="center"
                size={30}
              >
                Thank You for making an Impact!
              </Text>
              <br /> <br />
              <Text weight={700} size={18}>
                NFTs that you have claimed with this donation:
                <Grid mt="15px" mb="15px">
                  <Grid.Col span={7}>
                    <img
                      style={{ maxHeight: "240px", maxWidth: "240px" }}
                      src="https://raw.githubusercontent.com/RedTechSrb/ChainImpact/master/ChainImpactSmartContract/NFT/NFTsMetadata/educationnft.JPG"
                    ></img>
                  </Grid.Col>
                  <Grid.Col span={5} style={{ margin: "auto" }}>
                    Tier 1 Education NFT
                  </Grid.Col>
                  <Grid.Col span={7}>
                    <img
                      style={{ maxHeight: "240px", maxWidth: "240px" }}
                      src="https://raw.githubusercontent.com/RedTechSrb/ChainImpact/master/ChainImpactSmartContract/NFT/NFTsMetadata/generalnft.JPG"
                    ></img>
                  </Grid.Col>
                  <Grid.Col
                    span={5}
                    style={{ margin: "auto", marginLeft: "auto" }}
                  >
                    Tier 1 General NFT
                  </Grid.Col>
                </Grid>
              </Text>
            </>
          )}
        </Modal>

        <Modal opened={open1} onClose={handleModalClose} size="800px">
          <Grid>
            <Grid.Col>
              <Title>Help {project.name} reach it's goal!</Title>
              <Title size="lg" fw={200}>
                Make an Impact today.
              </Title>
            </Grid.Col>

            <Grid.Col></Grid.Col>

            <Grid.Col
              style={{ paddingBottom: "85px" }}
              span={6}
              // style={{
              //   display: "flex",
              //   justifyContent: "center",
              //   alignItems: "center",
              //   fontSize: "40px",
              // }}
            >
              <NumberInput
                hideControls
                type="number"
                decimalSeparator="."
                value={donationAmount}
                precision={3}
                label="Amount in SOL"
                placeholder="Help this project reach it's goal"
                description="Earn Proof of Impact NFT for donating"
                onChange={(value: any) => {
                  if (value >= 0) setDonationAmount(Number(value));
                  else setDonationAmount(0);
                }}
                size="lg"
              />
              <Button
                leftIcon={<IconHeart size="0.88rem" />}
                color="#33860c"
                radius="md"
                size="lg"
                style={{ width: "60%", backgroundColor: "#33860c" }}
                mt="sm"
                onClick={() => {
                  handleSubmit();
                }}
              >
                {walletKey ? "Donate" : "Connect to donate"}
              </Button>
              {/* <Button
                radius="md"
                size="lg"
                mt="sm"
                ml="sm"
                onClick={() => mintAndSendNFT_v2(walletKey, nft)}
              >
                Send NFT
              </Button> */}
              {transactionStatus === "failed" && (
                <Text mt={10} color="red" weight={700} pb={0}>
                  Transaction unsuccessful
                </Text>
              )}
              {transactionStatus === "pending" && (
                <Text mt={10} weight={700} pb={0}>
                  Processing transaction <Loader variant="dots" />
                </Text>
              )}
              {transactionStatus === "You can't donate this amount" && (
                <Text mt={10} color="red" weight={700} pb={0}>
                  Transaction failed, You can't donate this amount
                </Text>
              )}
            </Grid.Col>

            <Grid.Col span={6}>
              <Card
                withBorder
                radius="md"
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[7]
                      : theme.white,
                })}
              >
                {donationAmount === 0 || isNaN(donationAmount) ? (
                  <Text size="xl" weight={500} color={"#BBFD00"}>
                    Currently donated: ${project.totaldonated}
                  </Text>
                ) : (
                  <Text size="xl" weight={500} color={"#BBFD00"}>
                    Currently donated: ${project.totaldonated} +
                    <br />
                    <span
                      style={{ color: donationAmount ? "#8468e8" : "#BBFD00" }}
                    >
                      ${donationAmount*22} you donated!
                    </span>
                  </Text>
                )}

                <Text size="sm" weight={100} color="white" mb="xs">
                  Out of $USDC {project.financialgoal} goal
                </Text>
                <Progress
                  sections={[
                    {
                      value:
                        ((project.totaldonated * 1.0) / project.financialgoal) *
                        100,

                      label:
                        Math.round(
                          (((project.totaldonated * 1.0) /
                            project.financialgoal) *
                            100 +
                            Number.EPSILON) *
                            100
                        ) /
                          100 +
                        "%",
                      color: "#33860c",
                    },
                    {
                      value:
                        donationAmount == 0
                          ? 100 -
                            (project.totaldonated / project.financialgoal) * 100
                          : (donationAmount*22 / project.financialgoal) * 100 < 20
                          ? 20
                          : ((donationAmount*22 + project.totaldonated) /
                              project.financialgoal) *
                              100 >=
                            100
                          ? 100 -
                            (project.totaldonated / project.financialgoal) * 100
                          : (donationAmount*22 / project.financialgoal) * 100,

                      label:
                        donationAmount == 0 || isNaN(donationAmount)
                          ? "You can help!"
                          : donationAmount*22 + project.totaldonated <
                            project.financialgoal
                          ? Math.round(
                              (((donationAmount*22 * 1.0) /
                                project.financialgoal) *
                                100 +
                                Number.EPSILON) *
                                1000
                            ) /
                              1000 +
                            "%"
                          : "Goal Complete!",

                      color: "#8468e8",
                    },
                  ]}
                  size="xl"
                  radius="xl"
                />
                <Text size="xl" weight={500} color={"#BBFD00"} mt="xs">
                  Total backers: {project.totalbackers}
                </Text>

                {((project.totaldonated * 1.0) / project.financialgoal) * 100 +
                  (donationAmount*22 / project.financialgoal) * 100 >=
                100 ? (
                  <Text
                    size={30}
                    weight={500}
                    color={"#8468e8"}
                    mt="xs"
                    style={{ textAlign: "center" }}
                  >
                    Goal reached!
                  </Text>
                ) : (
                  <Text size="xl" weight={500} color={"#BBFD00"}></Text>
                )}
              </Card>
            </Grid.Col>

            <Grid.Col>
              <Text size="lg" mb="md">
                See how much you need to claim your NFT:
              </Text>
              {cookies.get("wallet") && (
                <NftStats
                  donationAmount={donationAmount*22}
                  primaryType={project.primarycausetype.name}
                  projectId={project.id}
                  wallet={walletKey}
                  setDataNftNew={setDataNftNew}
                ></NftStats>
              )}
              {!cookies.get("wallet") && (
                <Paper
                  withBorder
                  p="xs"
                  style={{ fontSize: "24px", textAlign: "center" }}
                  radius={25}
                >
                  <Text style={{ margin: "10px auto" }}>
                    You must connect with your wallet to see your NFT progress
                  </Text>
                </Paper>
              )}
            </Grid.Col>
          </Grid>
        </Modal>
      </Card.Section>
    </Card>
  );
}
