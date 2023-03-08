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
import { ImpactorTypeFilter } from "../../models/dto/request/ImpactorTypeFilter";
import { ImpactorsWithDonations } from "../../models/dto/response/ImpactorsWithDonations";
import { useGetImpactorsWithDonations } from "../../repositories/ImpactorRepository";
import ImpactorTable from "./ImpactorTable";

const impactortabledata = [
  {
    avatar:
      "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Robert Wolfkisser",
    job: "Engineer",
    email: "rob_wolf@gmail.com",
    role: "Collaborator",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Jill Jailbreaker",
    job: "Engineer",
    email: "jj@breaker.com",
    role: "Collaborator",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Henry Silkeater",
    job: "Designer",
    email: "henry@silkeater.io",
    role: "Contractor",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Bill Horsefighter",
    job: "Designer",
    email: "bhorsefighter@gmail.com",
    role: "Contractor",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Jeremy Footviewer",
    job: "Manager",
    email: "jeremy@foot.dev",
    role: "Manager",
  },
];

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

    "@media (max-width: 1440px)": {
      fontSize: 30,
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing.md,
    "@media (max-width: 1440px)": {
      marginTop: 0,
    },
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

const environmentalFilter: ImpactorTypeFilter = {
  pageNumber: 1,
  pageSize: 1,
  dto: {
    projectType: "environment",
  },
};

const socialFilter: ImpactorTypeFilter = {
  pageNumber: 1,
  pageSize: 1,
  dto: {
    projectType: "social",
  },
};

export default function TagLeaderboard() {
  const { classes, theme } = useStyles();

  function arangeImpactorData(data: ImpactorsWithDonations[]) {
    const impactorData = data.map((impactor) => ({
      avatar: impactor.imageurl
        ? impactor.imageurl
        : "https://avatars.githubusercontent.com/u/1309537?v=4",
      name: impactor.name,
      job: "",
      wallet: impactor.wallet,
      role: "Company",
      amount: impactor.totalDonations,
    }));
    return impactorData;
  }

  const impactorsEnvironmental = useGetImpactorsWithDonations(
    environmentalFilter,
    false
  );
  const impactorsSocial = useGetImpactorsWithDonations(socialFilter, false);
  const impactorsGeneral = useGetImpactorsWithDonations({}, false);

  const impactorsEnv = arangeImpactorData(impactorsEnvironmental);
  const impactorsSoc = arangeImpactorData(impactorsSocial);
  const impactorsGen = arangeImpactorData(impactorsGeneral);

  return (
    <Container size="xl" py="xl">
      <Title order={2} className={classes.title} align="center" mt="sm">
        Top Companies that make a real Impact
      </Title>

      <Text color="white" className={classes.description} align="center">
        Compete for top spot in each part of ESG. <br></br> Show that your
        company cares.
      </Text>

      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        <ImpactorTable
          data={impactorsEnv}
          title={"Environmental"}
          titlecolor={"#BBFD00"}
          type={"environment"}
          isPrivate={false}
        ></ImpactorTable>
        <ImpactorTable
          data={impactorsGen}
          title={"General"}
          titlecolor="fddf00"
          type={"general"}
          isPrivate={false}
        ></ImpactorTable>
        <ImpactorTable
          data={impactorsSoc}
          title={"Social"}
          titlecolor="#fddf00"
          type={"social"}
          isPrivate={false}
        ></ImpactorTable>
      </SimpleGrid>
    </Container>
  );
}
