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
import { Project } from "../../models/Project";
import { ProgressProject } from "../ProgressProject";

type ProjectComponentProps = {
  project: Project;
};

const useStyles = createStyles((theme) => ({
  card: {
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

export default function ProjectComponent({ project }: ProjectComponentProps) {
  const { classes, theme } = useStyles();

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={project.imageurl} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text size="lg" weight={500}>
            {project.name}
          </Text>
          <Group position="right">
            <Badge size="sm">{project.primarycausetype.name}</Badge>
            <Badge size="sm">{project.secondarycausetype.name}</Badge>
          </Group>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs">
          <Text size="md" weight={500}>
            Charity
          </Text>
          <Group>
            <Avatar src={project.charity.imageurl} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {project.charity.name}
              </Text>

              <Text color="dimmed" size="xs">
                {project.charity.wallet}
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

        <ProgressProject
          projectData={project}
          mtVal={""}
          mbVal={""}
        ></ProgressProject>
      </Card.Section>

        <Group mt="xs">
          <Button
            radius="md"
            style={{ flex: 1 }}
            color="lime"
            component="a"
            href={`/project/${project.id}`}
          >
            View project
          </Button>
        </Group>
      
    </Card>
  );
}
