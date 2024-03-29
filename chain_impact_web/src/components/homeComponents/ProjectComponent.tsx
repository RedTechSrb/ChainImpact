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
  Grid,
} from "@mantine/core";
import { Project } from "../../models/Project";

import { useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { ProjectProgress } from "../companyComponents/ProjectProgress";

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

  const isMobile = useMediaQuery("(max-width: 600px)");

  const href = isMobile ? `/mobile` : `/project/${project.id}`;

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Link to={href}>
          <Image src={project.imageurl} height={180} />
        </Link>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Grid>
          <Grid.Col span={7}>
            <Text size="lg" weight={500} color="#BBFD00">
              {project.name}
            </Text>
          </Grid.Col>
          <Grid.Col span={5}>
            <Group position="right">
              <Badge size="sm">{project.primarycausetype.name}</Badge>
              <Badge size="sm">{project.secondarycausetype.name}</Badge>
            </Group>
          </Grid.Col>
        </Grid>
        <Group position="apart"></Group>
        <Text size="sm" mt="xs" style={{ textAlign: "justify" }}>
          <Spoiler
            showLabel="Read more"
            hideLabel="Read less"
            maxHeight={3 * theme.fontSizes.sm} // Change the value as per your requirement
          >
            {project.description}
          </Spoiler>
        </Text>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs">
          <Text size="md" weight={500}>
            Angel Impactor
          </Text>
          <Text size="md" weight={500}>
            Charity
          </Text>
          <Group>
            <Avatar src={project.angelimpactor?.imageurl} radius="xl" />

            <div style={{ flex: 1 }}>
              {project.totaldonated !== 0 ? (
                <div>
                  <Text size="sm" weight={500}>
                    {project.angelimpactor?.name}
                  </Text>
                  <Text color="dimmed" size="xs">
                    {project.angelimpactor?.wallet.slice(0, 6) +
                      "..." +
                      project.angelimpactor?.wallet.slice(-6)}
                  </Text>
                </div>
              ) : (
                <Text size="sm" weight={500}>
                  Your company name and logo can be here too!
                </Text>
              )}
            </div>
          </Group>
          <Group>
            <Avatar src={project.charity.imageurl} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="md" weight={500}>
                {project.charity.name}
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
          projectData={project}
          mtVal={""}
          mbVal={""}
        ></ProjectProgress>
      </Card.Section>

      {project.totaldonated !== 0 ? (
        <Group mt="xs">
          <Button
            radius="md"
            style={{ flex: 1 }}
            color="lime"
            component="a"
            href={href}
          >
            Donate
          </Button>
        </Group>
      ) : (
        <Group mt="xs">
          <Text size="md" weight={500} color="lime">
            Be the first company to donate and become an Angel Impactor!
            Showcase your company values by making a project your own.
          </Text>

          <Button
            radius="md"
            style={{ flex: 1 }}
            color="pink"
            component="a"
            href={href}
          >
            Become Angel Impactor
          </Button>
        </Group>
      )}
    </Card>
  );
}
