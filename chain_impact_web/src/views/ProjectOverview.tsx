import {
  Avatar,
  Container,
  createStyles,
  Grid,
  Group,
  SimpleGrid,
  Skeleton,
  Title,
  Text,
  useMantineTheme,
  Image,
  ActionIcon,
  Progress,
  Loader,
} from "@mantine/core";
import {
  IconBrandDiscord,
  IconBrandInstagram,
  IconBrandTwitter,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Impactor from "../components/Impactor";
import { ProgressProject } from "../components/ProgressProject";
import AngelImpactor from "../components/projectComponents/AngelImpactor";
import DonationSidebar from "../components/projectComponents/DonationSidebar";
import RecentImpactors from "../components/projectComponents/RecentImpactors";
import { Project } from "../models/Project";
import { useGetSpecificProject } from "../repositories/ProjectRepository";
import NotFound from "./NotFound";

const PRIMARY_COL_HEIGHT = "32rem";

const useStyles = createStyles((theme) => ({
  container: {
    marginLeft: "5rem",
    marginRight: "5rem",
    marginTop: "2.5rem",
    [theme.breakpoints.sm]: {
      marginLeft: "2.5rem",
      marginRight: "2.5rem",
    },
  },
  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "623px",
  },
  loadingBar: {
    margin: "15vh auto 10px auto",
    fontSize: "30px",
  },
}));

export default function ProjectOverview() {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;
  const [isLoading, setIsLoading] = useState(true);
  const [isTimeout, setIsTimeout] = useState(false);
  let { id } = useParams();
  const projectSearch = { dto: { id: Number(id) } };
  const projectData: Project | undefined = useGetSpecificProject(projectSearch);

  useEffect(() => {
    if (projectData) setIsLoading(false);

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoading, projectData]);

  const angelimpactor = {
    imageurl: "https://picsum.photos/id/1/200",
    name: "John Doe",
    wallet: "0x1234567890abcdef",
  };

  const { classes } = useStyles();
  return (
    <>
      <Container size={1750}>
        {isLoading ? (
          <Container size={1750} className={classes.loadingContainer}>
            <Text className={classes.loadingBar}>Loading project data</Text>
            <Loader variant="dots" />
          </Container>
        ) : projectData ? (
          <Grid className={classes.container}>
            <Grid.Col span={9}>
              <Image
                src="https://picsum.photos/id/1/200"
                alt="alt"
                height={180}
                mb="md"
              />
              <SimpleGrid cols={2} verticalSpacing="sm">
                <Group>
                  <Title>{projectData?.name}</Title>
                </Group>
                <Group
                  spacing={0}
                  className={classes.links}
                  position="right"
                  noWrap
                >
                  <Text size="md" weight={500} color="white">
                    Connect on socials
                  </Text>
                  <ActionIcon
                    size="lg"
                    component="a"
                    href={projectData?.twitter ?? undefined}
                  >
                    <IconBrandTwitter size="1.05rem" stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon
                    size="lg"
                    component="a"
                    href={projectData?.discord ?? undefined}
                  >
                    <IconBrandDiscord size="1.05rem" stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon
                    size="lg"
                    component="a"
                    href={projectData?.instagram ?? undefined}
                  >
                    <IconBrandInstagram size="1.05rem" stroke={1.5} />
                  </ActionIcon>
                </Group>
              </SimpleGrid>

              <Grid>
                <Grid.Col span={4}>
                  <ProgressProject
                    projectData={projectData}
                    mtVal={""}
                    mbVal={""}
                  ></ProgressProject>
                </Grid.Col>
                <Grid.Col span={8}></Grid.Col>
              </Grid>

              {/* <Text size="xl" weight={500} mt="lg">
                Currently donated: ${projectData.totaldonated}
              </Text>
              <Text size="sm" weight={100} color="white">
                Out of US$ {projectData.financialgoal} goal
              </Text>
              <Progress
                value={
                  ((projectData.totaldonated * 1.0) /
                    projectData.financialgoal) *
                  100
                }
                label={
                  ((projectData.totaldonated * 1.0) /
                    projectData.financialgoal) *
                    100 +
                  "%"
                }
                mt="sm"
                size="xl"
                radius="xl"
                mb="sm"
              /> */}

              {/* <Group position="right">
                <Text size="xl" weight={500}>
                  Angel Impactor
                </Text>
                <Avatar src={angelimpactor?.imageurl} radius="xl" />

                <div style={{ flex: 1 }}>
                  <Text size="sm" weight={500}>
                    {angelimpactor?.name}
                  </Text>

                  <Text color="dimmed" size="xs">
                    {angelimpactor?.wallet}
                  </Text>
                </div>
              </Group> */}
              <SimpleGrid cols={2} verticalSpacing="sm">
                <Text size={24} weight={500} color="white" mt="sm">
                  Description
                </Text>
                <Text size={24} weight={500} color="white" mt="sm">
                  Angel Impactor who brought this project to life.
                </Text>
                <Text size="md" color="white">
                  {projectData?.description}
                </Text>

                <AngelImpactor
                  imageurl={angelimpactor.imageurl}
                  name={angelimpactor.name}
                  wallet={angelimpactor.wallet}
                ></AngelImpactor>
              </SimpleGrid>
              <Text size="xl" weight={500} mb="xl">
                Recent Donators
              </Text>
              <RecentImpactors></RecentImpactors>

              <Text size="xl" weight={500} mb="xl">
                Biggest donators
              </Text>
              <RecentImpactors></RecentImpactors>

              <Text size="xl" weight={500} mb="xl">
                Milestones
              </Text>
              <RecentImpactors></RecentImpactors>
            </Grid.Col>

            <Grid.Col span={3}>
              <DonationSidebar project={projectData}></DonationSidebar>
            </Grid.Col>
          </Grid>
        ) : (
          <NotFound />
        )}
      </Container>
    </>
  );
}
