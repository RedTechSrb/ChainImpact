import {
  ActionIcon,
  Anchor,
  Container,
  createStyles,
  Flex,
  Grid,
  Group,
  Loader,
  Modal,
  SimpleGrid,
  Text,
  Timeline,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
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
  IconNumber5,
  IconNumber6,
  IconNumber7,
  IconNumber8,
  IconNumber9,
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
  useGetMilestones,
  useGetSpecificProject,
} from "../repositories/ProjectRepository";
import NotFound from "./NotFound";
import { MilestoneSearch } from "../models/dto/request/MilestoneSearch";
import { Milestone } from "../models/Milestone";
import { MilestoneResponse } from "../models/dto/response/MilestonesResponse";
import { Transaction } from "../models/Transaction";

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

  hoverable: {
    padding: "5px 20px",
    marginBottom: "10px",
    '&:hover': {
      backgroundColor: theme.colorScheme === "dark"
        ? theme.colors.dark[4] : "white",
      borderTopRightRadius: "15px",
      borderBottomRightRadius: "15px",
      cursor: "pointer"
    }
  }
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

  const { classes } = useStyles();
  const laptop = useMediaQuery(`(max-width: 1440px)`);

  const mobile = useMediaQuery(`(max-width: 900px)`);
  let { id } = useParams();
  const projectSearch = { dto: { id: Number(id) } };
  const projectData: Project | undefined = useGetSpecificProject(projectSearch);

  const donationSearch = {
    dto: { projectid: Number(id) },
    pageNumber: 1,
    pageSize: 12,
  };

  const [opened, { open, close }] = useDisclosure(false);
  const [milestoneAndTransactions, setMilestoneAndTransactions] = useState<MilestoneResponse>();
 // const [ModalMilestones, setModalMilestones] = useState<MilestoneResponse>();
  

  function handleOpen(milestoneData: MilestoneResponse) {
    setMilestoneAndTransactions(milestoneData);
    console.log(milestoneAndTransactions?.milestone.complete != null)
    open();
  }

  function handleClose() {
    close();
  }


  function formatDate(epochTime: number) {
    const dateObj = new Date(epochTime * 1000);
    const options = { hour12: false };
    const formattedDate = dateObj.toLocaleDateString();
    const formattedTime = dateObj.toLocaleTimeString(undefined, options);
    return `${formattedDate} ${formattedTime}`;
  };
  
  function TimeAgoMessage(dateTimeString: string) {
    const dateTime = new Date(dateTimeString);
    const currentDate = new Date();
    const elapsedMilliseconds = currentDate.getTime() - dateTime.getTime();

    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const elapsedDays = Math.floor(elapsedHours / 24);
    const elapsedWeeks = Math.floor(elapsedDays / 7);
    const elapsedMonths = Math.floor(elapsedDays / 30);
    const elapsedYears = Math.floor(elapsedDays / 365);

    if (elapsedSeconds < 60) {
      return `${elapsedSeconds} ${elapsedSeconds>1?"seconds":"second"} ago`;
    } else if (elapsedMinutes < 60) {
      return `${elapsedMinutes} ${elapsedMinutes>1?"minutes":"minute"} ago`;
    } else if (elapsedHours < 24) {
      return `${elapsedHours} ${elapsedHours>1?"hours":"hour"} ago`;
    } else if (elapsedDays < 7) {
      return `${elapsedDays} ${elapsedDays>1?"days":"day"} ago`;
    } else if (elapsedWeeks < 4) {
      return `${elapsedWeeks} ${elapsedWeeks>1?"weeks":"week"} ago`;
    } else if (elapsedMonths < 12) {
      return `${elapsedMonths} ${elapsedMonths>1?"months":"month"} ago`;
    } else {
      return `${elapsedYears} ${elapsedYears>1?"years":"year"} ago`;
    }
  };

  const milestoneSearch: MilestoneSearch = { dto: { project: { id: Number(id)} } };
  const milestonesAPI: MilestoneResponse[] = useGetMilestones(milestoneSearch);
  let milestonesCompleted = -1;
  const milestonesDATA = milestonesAPI.map((item, index) => {
    if (item.milestone.complete) milestonesCompleted+=1;
    return (
      <Timeline.Item key={index} className={classes.hoverable}
         onClick={() => handleOpen(item)}
        bullet=
          {
            index===0?<IconNumber1 size={12} />
            :
            index===1?<IconNumber2 size={12} />
            :
            index===2?<IconNumber3 size={12} />
            :
            index===3?<IconNumber4 size={12} />
            :
            index===4?<IconNumber5 size={12} />
            :
            index===5?<IconNumber6 size={12} />
            :
            index===6?<IconNumber7 size={12} />
            :
            index===7?<IconNumber8 size={12} />
            :
            <IconNumber9 size={12} />
          }
        title={item.milestone.name}
        lineVariant={(milestonesAPI[index+1])?!milestonesAPI[index+1].milestone.complete?"dashed":"solid":"solid"}
      >
        <Text color="dimmed" size="sm">
          {item.milestone.description}
        </Text>
        <Text size="xs" mt={4}>
          {item.milestone.complete?TimeAgoMessage(formatDate(item.milestone.complete)):"soon"}
        </Text>
      </Timeline.Item>
    );
  })
  console.log(milestonesAPI);

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
        newDonationSidebarPosition = -1;
      }else if (scrollTop + donationSidebarHeight >= (componentBottom-150)){
        newDonationSidebarPosition = componentBottom - donationSidebarHeight;
      } else if (scrollTop <= componentTop) {
        newDonationSidebarPosition = -1;
      }  else {
        newDonationSidebarPosition = componentTop;
      }

      setDonationSidebarPosition(newDonationSidebarPosition);
      
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
                Description
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
                  Video Presentation
                </Text>
                <Text
                  size={laptop ? 20 : 24}
                  weight={500}
                  color="white"
                  mt="sm"
                >
                  Angel Impactor who brought this project to life
                </Text>

                <Flex justify="center" align="center"
                    sx={(theme) => ({
                      backgroundColor:
                        theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
                    })}
                    style={{borderRadius: "30px", width: "100%", height: "100%"}}
                    >
                  <Text style={{
                    margin: "auto 0px", fontSize: "40px"}}>
                      Coming soon
                  </Text>
                </Flex>

                <AngelImpactor
                  impactor={projectData.angelimpactor}
                ></AngelImpactor>
              </SimpleGrid>

              <SimpleGrid cols={2}>
              <Text
                  size={laptop ? 20 : 24}
                  weight={500}
                  color="white"
                  mt="sm"
                  style={{ marginRight: "auto", marginTop: "50px" }}
                >
                  Recent Impactors
                </Text>
                <Text
                  size={laptop ? 20 : 24}
                  weight={500}
                  color="white"
                  mt="sm"
                  style={{ marginRight: "auto", marginTop: "50px" }}
                >
                  Biggest Impactors
                </Text>

                <RecentImpactors
                  recentImpactors={recentImpactors}
                ></RecentImpactors>

                <BiggestImpactors
                  biggestImpactors={biggestImpactors}
                ></BiggestImpactors>
              </SimpleGrid>

              <Modal opened={opened} onClose={handleClose} title="Milestone transactions" centered
                  size="lg" padding="xl" radius={15}>
                  {/* if milestone has been completed */}
                  { milestoneAndTransactions?.milestone.complete &&
                    <>
                      { // if milestone has been completed, but there is still no transaction
                        milestoneAndTransactions.transactions.length===0 &&
                        <SimpleGrid cols={1}>
                          <Text align="center" style={{padding: "5px 0px", fontWeight: "bold"}}>
                            Transaction for this milestone will be added shortly
                          </Text>
                        </SimpleGrid>
                      }
                      { // if milestone has been completed, and there are transactions
                        milestoneAndTransactions.transactions.length>0 &&
                        <SimpleGrid cols={2}>
                          {
                            milestoneAndTransactions.transactions.map((item) => 
                              <>
                                <Text align="right" style={{padding: "5px 0px", fontWeight: "bold"}}>
                                  {
                                    item.sender + " -> " + item.receiver + ": "
                                  }
                                </Text>
                                <Text style={{padding: "5px 0px 5px 40px", fontWeight: "bold"}}>
                                  {
                                    item.amount?'$'+item.amount:""
                                  }
                                </Text>
                              </>
                            )
                          }
                    
                    </SimpleGrid>
                      }
                    </>
                  
                  }
                  {  // if milestone has not been completed
                    !milestoneAndTransactions?.milestone.complete &&
                    <>
                      { // and there are no transactions for it
                        milestoneAndTransactions?.transactions.length===0 &&
                        <SimpleGrid cols={1}>
                          <Text align="center" style={{padding: "5px 0px", fontWeight: "bold"}}>
                            Transaction for this milestone will be added once the milestone has been completed
                          </Text>
                        </SimpleGrid>
                      }
                    </>
                  }
              </Modal>

              <SimpleGrid cols={1}>
                <Text
                  size={laptop ? 20 : 24}
                  weight={500}
                  color="white"
                  mt="sm"
                  style={{ marginRight: "auto", marginTop: "70px" }}
                >
                  Project Milestones
                </Text>

                <Timeline
                  color="lime"
                  radius="md"
                  active={milestonesCompleted}
                  bulletSize={24}
                  mt="xl"
                >
                  {milestonesDATA}
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
