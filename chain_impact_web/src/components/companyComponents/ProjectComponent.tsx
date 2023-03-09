import { IconHeart } from "@tabler/icons";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
  Avatar,
  Progress,
  Container,
  SimpleGrid,
  Spoiler,
} from "@mantine/core";
import { ProjectWithTotalDonations } from "../../models/dto/response/ProjectWithTotalDonations";
import { ProjectProgress } from "./ProjectProgress";

type ProjectComponentProps = {
  data: ProjectWithTotalDonations;
  impactorName: string;
};

const useStyles = createStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  gradientSpan: {
    background: "linear-gradient(to right, #9945FF, #14F195)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

export default function ProjectComponent({ data, impactorName }: ProjectComponentProps) {
  const { classes, theme } = useStyles();

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section style={{backgroundColor: "#BBFD00", color: "black", fontWeight: "700", textAlign: "center"}}>
        {impactorName + " donated $" + data.totalDonation} 
      </Card.Section>
      <Card.Section>
        <Image src={data.project.imageurl} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart" style={{alignItems: "start"}}>
          <Text size="lg" weight={500} style={{minHeight: "60px", textAlign: "center", margin: "auto"}}>
            {data.project.name}
          </Text>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs" style={{minHeight: "50px", alignItems: "center"}}>
          <Text size="md" weight={500}>
            Charity
          </Text>
          <Group>
            <Avatar src={data.project.charity.imageurl} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {data.project.charity.name}
              </Text>

              <Text color="dimmed" size="xs">
                {data.project.charity.wallet}
              </Text>
            </div>
          </Group>
        </SimpleGrid>

        {/* <Text size="lg" weight={500} mt="lg">
          Project Goal ${totaldonated} / ${financialgoal}
        </Text>
        <Progress
          value={((totaldonated * 1.0) / financialgoal) * 100}
          label={((totaldonated * 1.0) / financialgoal) * 100 + "%"}
          mt="sm"
          size="xl"
          radius="xl"
        /> */}

        <ProjectProgress
          projectData={data.project}
          mtVal={""}
          mbVal={""}
        ></ProjectProgress>
        
      </Card.Section>

        <Card.Section style={{display: "flex", marginTop: "auto"}}>
          <Button
            radius="md"
            style={{ flex: 1}}
            color="lime"
            component="a"
            href={`/project/${data.project.id}`}
          >
            View project
          </Button>
        </Card.Section>
      
    </Card>
  );
}
