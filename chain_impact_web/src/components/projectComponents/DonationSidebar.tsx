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
} from "@mantine/core";
import { clusterApiUrl, Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import { Icon123, IconHeart } from "@tabler/icons";
import { useState } from "react";
import { Project } from "../../models/Project";
import { ProgressProject } from "../ProgressProject";
import { NftStats } from "./NftStats";
import { Program, Provider, web3, BN, getProvider } from '@coral-xyz/anchor';
import idl from '../../res/transactions/idl.json';

type DonationSidebarProps = {
  project: Project;
  sidebarTop: number;
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

const programID = new PublicKey(idl.metadata.address)
const network = clusterApiUrl('devnet')

//Ovo odredjuje koliko se ceka da se validira transakcija
const opts = {
  preflightCommitment: "processed"
}

export default function DonationSidebar({
  project,
  sidebarTop,
}: DonationSidebarProps) {
  const { classes } = useStyles();
  const [open, setOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number>(0);

  const to = new PublicKey("qM1bJMbdwqtJGz8R5hQmw86xooCvfkjpnzUXqbJxbTT"); // wallet of project for donating to
  const poreskaUprava = new PublicKey("Gu766PjJnV7DbbEWGPRUPtpeSGB5Xz3DJGiETuk1uHmE");

  const handleDonateClick = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const dataNft = {
    data: [
      {
        label: "Page views",
        stats: "456,578",
        progress: 65,
        color: "teal",
      },
      {
        label: "New users",
        stats: "2,550",
        progress: 72,
        color: "blue",
      },
    ],
  };

  /*const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(connection, window.solana, opts.preflightCommitment);
    return provider
  }

  const donateToLimun = async () => {
    try {
      console.log("Amount donated:", donationAmount);
      const connection = new Connection(network, opts.preflightCommitment);
      const provider = getProvider()
      const program = new Program(idl, programID, provider);
      let balance = await connection.getBalance(to) / web3.LAMPORTS_PER_SOL;
      console.log("Limun wealth: ", balance);
      console.log("Donating 0.1 SOL to Limun...");
      let ts = await program.rpc.transfer(new BN(donationAmount * web3.LAMPORTS_PER_SOL),
        {
          accounts:
          {
            user: provider.wallet.publicKey,
            receiver: to,
            feeCollector: poreskaUprava,
            systemProgram: SystemProgram.programId
          }
        });
      console.log("Transaction signature:", ts);
      balance = await connection.getBalance(to) / web3.LAMPORTS_PER_SOL;
      console.log("Limun wealth: ", balance);
    }
    catch (err) {
      console.error("Error in donating to Limun", err)
    }
  }*/

  return (
    <Card
      withBorder
      radius="md"
      className={classes.card}
      style={{ top: `${sidebarTop}px` }}
    >
      <Card.Section className={classes.imageSection}>
        <Image
          src="https://media.istockphoto.com/id/174062115/photo/homeless-people.jpg?s=612x612&w=is&k=20&c=9fbaYUH1LNfNUsPopf1lwKjtSDwdYLb2lENKvZCVPWA="
          alt="Tesla Model S"
          className={classes.image}
        />
      </Card.Section>

      <Text size={"xl"} weight={500} mt="0" color={"#BBFD00"}>
        {project.name}
      </Text>
      <ProgressProject
        projectData={project}
        mtVal={"lg"}
        mbVal={"0"}
      ></ProgressProject>

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
          Become an Impactor
        </Button>

        <Modal opened={open} onClose={handleModalClose} size="800px">
          <Grid>
            <Grid.Col>
              <Title>Help {project.name} reach it's goal!</Title>
              <Title size="lg" fw={200}>
                Become an Impactor today.
              </Title>
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                value={donationAmount}
                label="Amount in USDC"
                placeholder="Help this project reach it's goal"
                description="Earn Proof of Impact NFT for donating"
                onChange={(value: number) => {if(value >= 0) setDonationAmount(value); else setDonationAmount(0)}}
                size="lg"
              />
            </Grid.Col>
            <Grid.Col></Grid.Col>
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
                { (donationAmount === 0 || isNaN(donationAmount)) ? (
                  <Text size="xl" weight={500} color={"#BBFD00"}>
                    Currently donated: ${project.totaldonated}
                  </Text>
                ) : (
                  <Text size="xl" weight={500} color={"#BBFD00"}>
                    Currently donated: ${project.totaldonated} +{" "}
                    <span
                      style={{ color: donationAmount ? "#8468e8" : "#BBFD00" }}
                    >
                      ${donationAmount} you donated!
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
                      Math.round((((project.totaldonated * 1.0) / project.financialgoal) * 100 + Number.EPSILON)* 100) / 100 +
                      "%",
                      color: "#68b5e8",
                    },
                    {
                      value:
                        donationAmount == 0
                          ? 50
                          : (donationAmount / project.financialgoal) * 100 < 20
                          ? 20
                          : (donationAmount / project.financialgoal) * 100,

                      label:
                        (donationAmount == 0 || isNaN(donationAmount))
                          ? "You can help!"
                          : 
                          (donationAmount + project.totaldonated < project.financialgoal) 
                          ? (Math.round((((donationAmount * 1.0) / project.financialgoal) * 100 + Number.EPSILON)* 1000) / 1000 +
                          "%")
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
                  (donationAmount / project.financialgoal) * 100 >=
                100 ? (
                  <Text size={42} weight={500} color={"#8468e8"} mt="xs">
                    Goal reached!
                  </Text>
                ) : (
                  <Text size="xl" weight={500} color={"#BBFD00"}></Text>
                )}
              </Card>
            </Grid.Col>

            <Grid.Col
              span={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "40px",
              }}
            >
              <Button
                leftIcon={<IconHeart size="2rem" />}
                style={{
                  fontSize: "2rem",
                }}
                color="lime"
                radius="md"
                size="xl"
              >
                Donate
              </Button>
            </Grid.Col>

            <Grid.Col>
              <Text size="lg" mb="md">
                See how much you need to become an Impactor:
              </Text>
              <NftStats
                data={dataNft.data}
                progress={donationAmount}
              ></NftStats>
            </Grid.Col>
          </Grid>
        </Modal>
      </Card.Section>
    </Card>
  );
}
