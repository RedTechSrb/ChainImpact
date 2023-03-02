import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
} from "@mantine/core";
import { IconGauge, IconUser, IconCookie } from "@tabler/icons";
import { ImpactorsWithDonations } from "../models/dto/response/ImpactorsWithDonations";
import { useGetImpactorsWithDonations } from "../repositories/ImpactorRepository";
import ImpactorTable from "./ImpactorTable";


const mockdata = [
  {
    title: "Extreme performance",
    description:
      "This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit",
    icon: IconGauge,
  },
  {
    title: "Privacy focused",
    description:
      "People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma",
    icon: IconUser,
  },
  {
    title: "No third parties",
    description:
      "They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves",
    icon: IconCookie,
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 34,
    fontWeight: 900,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 24,
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: "#BBFD00",
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
    },
  },
}));

export default function TagLeaderboard() {
  const { classes, theme } = useStyles();

  function arangeImpactorData(data: ImpactorsWithDonations[]) {
    const impactorData = data.map((impactor) => ({
      avatar: impactor.imageurl
        ? impactor.imageurl
        : "https://avatars.githubusercontent.com/u/1309537?v=4",
      name: impactor.name,
      job: "",
      email: impactor.wallet,
      role: "Company",
      amount: impactor.totalDonations
    }));
    return impactorData;
  }

  const companyImpactors = useGetImpactorsWithDonations({}, false);
  const privateUserImpactors = useGetImpactorsWithDonations({}, true);

  const comImpactors = arangeImpactorData(companyImpactors);
  const privImpactors = arangeImpactorData(privateUserImpactors);

  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      p="xl"
    >
      <feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
      <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text size="sm" color="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));
  return (
    <Container size="lg" py="xl">
      <Title order={2} className={classes.title} align="center" mt="sm">
        Find the Biggest Impactors
      </Title>

      <Text
        color="white"
        className={classes.description}
        align="center"
        mt="md"
      >
        See which communities have the strongest social presence and which
        community members make it all happen!
      </Text>

      <SimpleGrid
        cols={2}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        <ImpactorTable
          data={comImpactors}
          title={"Company ESG Leaders"}
          titlecolor=""
          type={"general"}
          isPrivate={false}
        ></ImpactorTable>

        <ImpactorTable
          data={privImpactors}
          title={" Community ESG Leaders"}
          titlecolor="#BBFD00"
          type={"general"}
          isPrivate={true}
        ></ImpactorTable>
      </SimpleGrid>
    </Container>
  );
}
