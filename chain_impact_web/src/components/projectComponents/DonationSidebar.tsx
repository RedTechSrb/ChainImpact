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
} from "@mantine/core";
import { Icon123 } from "@tabler/icons";
import { Project } from "../../models/Project";
import { ProgressProject } from "../ProgressProject";

type DonationSidebarProps = {
  project: Project;
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

  icon: {
    marginRight: "5px",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

const mockdata = [
  { label: "4 passengers" },
  { label: "100 km/h in 4 seconds" },
  { label: "Automatic gearbox" },
  { label: "Electric" },
];

export default function DonationSidebar({ project }: DonationSidebarProps) {
  const { classes } = useStyles();
  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <Icon123 size="1.05rem" className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S" />
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
        <TextInput
          placeholder="Amount in USDC"
          label="Amount"
          //error="Wallet not connected, please press connect wallet"
          radius="lg"
          withAsterisk
        />
        <Button radius="xl" style={{ flex: 1 }} mt="xl">
          Donate
        </Button>
      </Card.Section>
    </Card>
  );
}
