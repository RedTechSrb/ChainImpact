import {
  ActionIcon,
  Container,
  createStyles,
  Grid,
  Group,
  Loader,
  SimpleGrid,
  Text,
  Timeline,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBrandDiscord,
  IconBrandInstagram,
  IconBrandTwitter,
  IconGitBranch,
  IconGitCommit,
  IconGitPullRequest,
  IconMessageDots,
  IconNumber1,
  IconNumber2,
  IconNumber3,
  IconNumber4,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies, { Cookie } from "universal-cookie";
import AngelImpactor from "../components/projectComponents/AngelImpactor";
import BiggestImpactors from "../components/projectComponents/BiggestImpactors";
import DonationSidebar from "../components/projectComponents/DonationSidebar";
import RecentImpactors from "../components/projectComponents/RecentImpactors";
import { Donation } from "../models/Donation";
import { ImpactorsWithProjectsSearch } from "../models/dto/request/ImpactorsWithProjectsSearch";
import { ImpactorWalletSearch } from "../models/dto/request/ImpactorWalletSearch";
import { AngelImpactorData } from "../models/dto/response/AngelImpactorData";
import { BiggestDonators } from "../models/dto/response/BiggestDonators";
import { ProjectWithTotalDonations } from "../models/dto/response/ProjectWithTotalDonations";
import { Project } from "../models/Project";
import { useGetRecentDonations } from "../repositories/DonationRepository";

import {
  useGetBiggestImpactors,
  useGetSpecificProject,
} from "../repositories/ProjectRepository";
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
  grid: {
    maxHeight: "60vh",
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

interface WalletKey {
  walletKey: string;
  setWalletKey: any;
  cookies: Cookies;
}

export default function ProjectOverview({
  walletKey,
  setWalletKey,
  cookies,
}: WalletKey) {
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarTop, setSidebarTop] = useState(0);

  const mobile = useMediaQuery(`(max-width: 900px)`);
  let { id } = useParams();
  const projectSearch = { dto: { id: Number(id) } };
  const projectData: Project | undefined = useGetSpecificProject(projectSearch);

  const donationSearch = {
    dto: { projectid: Number(id) },
    pageNumber: 1,
    pageSize: 4,
  };

  const [donationSidebarPosition, setDonationSidebarPosition] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const donationSidebar = document.getElementById("donation-sidebar");
    const component = document.getElementById("component");

    if (donationSidebar && component) {
      const donationSidebarHeight = donationSidebar.offsetHeight;
      const componentTop = component.offsetTop;
      const componentHeight = component.offsetHeight;
      const componentBottom = componentTop + componentHeight;
      const scrollTop = window.scrollY;

      let newDonationSidebarPosition = donationSidebarPosition;
      if (
        scrollTop > componentTop &&
        scrollTop + donationSidebarHeight < componentBottom
      ) {
        newDonationSidebarPosition = scrollTop;
      } else if (scrollTop <= componentTop) {
        newDonationSidebarPosition = 5;
      } else {
        newDonationSidebarPosition = componentBottom - donationSidebarHeight;
      }

      if (newDonationSidebarPosition !== donationSidebarPosition) {
        setDonationSidebarPosition(newDonationSidebarPosition);
      }
    }
  };

  const recentImpactors: Donation[] = useGetRecentDonations(donationSearch);
  const biggestImpactors: BiggestDonators[] =
    useGetBiggestImpactors(donationSearch);

  useEffect(() => {
    if (projectData) setIsLoading(false);

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoading, projectData]);

  const { classes } = useStyles();
  const laptop = useMediaQuery(`(max-width: 1440px)`);

  return (
    <>
      <Container size={1750} id="component">
        {isLoading ? (
          <Container size={1750} className={classes.loadingContainer}>
            <Text className={classes.loadingBar}>Loading project data</Text>
            <Loader variant="dots" />
          </Container>
        ) : projectData ? (
          <Grid className={classes.container}>
            <Grid.Col span={mobile ? 12 : 9}>
              {/* <Image
                src="https://media.istockphoto.com/id/506664332/photo/business-with-csr-practice.jpg?s=1024x1024&w=is&k=20&c=qKTzGl0Wec-oxJ_sU-eTcPDzooTSqIyHIh3rmIeUNcI="
                alt="alt"
                height={180}
                mb="md"
              /> */}
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
                  <Text size={18} weight={500} color="white" mr="sm">
                    Connect on socials
                  </Text>
                  <ActionIcon
                    size="xl"
                    component="a"
                    href={projectData?.twitter ?? undefined}
                  >
                    <IconBrandTwitter size="1.5rem" stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon
                    size="xl"
                    component="a"
                    href={projectData?.discord ?? undefined}
                  >
                    <IconBrandDiscord size="1.5rem" stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon
                    size="xl"
                    component="a"
                    href={projectData?.instagram ?? undefined}
                  >
                    <IconBrandInstagram size="1.5rem" stroke={1.5} />
                  </ActionIcon>
                </Group>
              </SimpleGrid>

              <Text size={24} weight={500} color="white" mt="sm">
                Description:
              </Text>
              <Text
                size="md"
                color="white"
                mb="xl"
                style={{ textAlign: "justify" }}
              >
                {projectData?.description}
              </Text>

              <SimpleGrid
                cols={2}
                verticalSpacing="sm"
                mb="xl"
                className={classes.grid}
              >
                <Text
                  size={laptop ? 20 : 24}
                  weight={500}
                  color="white"
                  mt="sm"
                >
                  Recent Impactors:
                </Text>
                <Text
                  size={laptop ? 20 : 24}
                  weight={500}
                  color="white"
                  mt="sm"
                >
                  Angel Impactor who brought this project to life.
                </Text>

                <RecentImpactors
                  recentImpactors={recentImpactors}
                ></RecentImpactors>

                <AngelImpactor
                  impactor={projectData.angelimpactor}
                ></AngelImpactor>
              </SimpleGrid>

              <SimpleGrid cols={1}>
                <Text
                  size={laptop ? 20 : 24}
                  weight={500}
                  color="white"
                  mt="sm"
                  style={{ marginRight: "auto", marginTop: "30px" }}
                >
                  Biggest Impactors:
                </Text>

                <BiggestImpactors
                  biggestImpactors={biggestImpactors}
                ></BiggestImpactors>
              </SimpleGrid>

              <SimpleGrid cols={1}>
                <Text
                  size={laptop ? 20 : 24}
                  weight={500}
                  color="white"
                  mt="sm"
                  style={{ marginRight: "auto", marginTop: "30px" }}
                >
                  Project Milestones: (Coming Soon)
                </Text>

                <Timeline
                  color="lime"
                  radius="md"
                  active={2}
                  bulletSize={24}
                  mt="xl"
                >
                  <Timeline.Item
                    bullet={<IconNumber1 size={12} />}
                    title="New branch"
                  >
                    <Text color="dimmed" size="sm">
                      You&apos;ve created new branch{" "}
                      <Text variant="link" component="span" inherit>
                        fix-notifications
                      </Text>{" "}
                      from master
                    </Text>
                    <Text size="xs" mt={4}>
                      2 hours ago
                    </Text>
                  </Timeline.Item>

                  <Timeline.Item
                    bullet={<IconNumber2 size={12} />}
                    title="Commits"
                  >
                    <Text color="dimmed" size="sm">
                      You&apos;ve pushed 23 commits to
                      <Text variant="link" component="span" inherit>
                        fix-notifications branch
                      </Text>
                    </Text>
                    <Text size="xs" mt={4}>
                      52 minutes ago
                    </Text>
                  </Timeline.Item>

                  <Timeline.Item
                    title="Pull request"
                    bullet={<IconNumber3 size={12} />}
                    lineVariant="dashed"
                  >
                    <Text color="dimmed" size="sm">
                      You&apos;ve submitted a pull request
                      <Text variant="link" component="span" inherit>
                        Fix incorrect notification message (#187)
                      </Text>
                    </Text>
                    <Text size="xs" mt={4}>
                      34 minutes ago
                    </Text>
                  </Timeline.Item>

                  <Timeline.Item
                    title="Code review"
                    bullet={<IconNumber4 size={12} />}
                  >
                    <Text color="dimmed" size="sm">
                      <Text variant="link" component="span" inherit>
                        Robert Gluesticker
                      </Text>{" "}
                      left a code review on your pull request
                    </Text>
                    <Text size="xs" mt={4}>
                      12 minutes ago
                    </Text>
                  </Timeline.Item>
                </Timeline>
              </SimpleGrid>

              {/* <RecentImpactors></RecentImpactors>

              <Text size="xl" weight={500} mb="xl">
                Milestones
              </Text>
              <RecentImpactors></RecentImpactors> */}
            </Grid.Col>

            <Grid.Col span={mobile ? 12 : 3}>
              <DonationSidebar
                project={projectData}
                sidebarTop={donationSidebarPosition}
                walletKey={walletKey}
                setWalletKey={setWalletKey}
                cookies={cookies}
              ></DonationSidebar>
            </Grid.Col>
          </Grid>
        ) : (
          <NotFound />
        )}
      </Container>
    </>
  );
}
