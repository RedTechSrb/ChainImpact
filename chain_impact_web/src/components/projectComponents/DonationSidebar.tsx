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
} from "@mantine/core";
import { Icon123 } from "@tabler/icons";
import { useState } from "react";
import { Project } from "../../models/Project";
import { ProgressProject } from "../ProgressProject";

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

export default function DonationSidebar({
  project,
  sidebarTop,
}: DonationSidebarProps) {
  const { classes } = useStyles();
  const [open, setOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number | "">(0);

  const handleDonateClick = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

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

      <Text size={"xl"} weight={500} mt="lg" color={"#BBFD00"}>
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
          mt="xl"
          onClick={handleDonateClick}
        >
          Donate
        </Button>

        <Modal
          opened={open}
          onClose={handleModalClose}
          title={`Help ${project.name} reach it's goal!`}
          size="auto"
        >
          <NumberInput
            defaultValue={18}
            placeholder="Help this project reach it's goal"
            description="Earn Proof of Impact"
            value={donationAmount}
            onChange={setDonationAmount}
          />
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
            <Text size="xl" weight={500} color={"#BBFD00"}>
              Currently donated: ${project.totaldonated}
            </Text>
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
                    ((project.totaldonated * 1.0) / project.financialgoal) *
                      100 +
                    "%",
                  color: "#68b5e8",
                },
                {
                  value:
                    ((project.totaldonated * 1.0) / project.financialgoal) *
                    100,

                  label:
                    ((project.totaldonated * 1.0) / project.financialgoal) *
                      100 +
                    "%",
                  color: "#8468e8",
                },
              ]}
              size="xl"
              radius="xl"
            />
            <Text size="xl" weight={500} color={"#BBFD00"} mt="xs">
              Total backers: {project.totalbackers}
            </Text>
          </Card>
        </Modal>
      </Card.Section>
    </Card>
  );
}
