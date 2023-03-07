import {
  ActionIcon,
  Container,
  createStyles,
  Grid,
  Group,
  Image,
  Loader,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBrandDiscord,
  IconBrandInstagram,
  IconBrandTwitter,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompanyData from "../components/companyComponents/CompanyData";
import AngelImpactor from "../components/projectComponents/AngelImpactor";
import DonationSidebar from "../components/projectComponents/DonationSidebar";
import RecentImpactors from "../components/projectComponents/RecentImpactors";
import { Impactor } from "../models/Impactor";
import { Project } from "../models/Project";
import { useGetAllImpactors } from "../repositories/ImpactorRepository";
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

export default function CompanyOverview() {
  const theme = useMantineTheme();

  const [isLoading, setIsLoading] = useState(true);

  const mobile = useMediaQuery(`(max-width: 900px)`);
  let { id } = useParams();
  //const projectSearch = { dto: { id: Number(id) } };
  const companyData: Impactor | undefined = useGetAllImpactors()[0];

  useEffect(() => {
    if (companyData) setIsLoading(false);

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoading, companyData]);

  const angelimpactor = {
    imageurl: "https://picsum.photos/id/1/200",
    name: "John Doe",
    wallet: "0x1234567890abcdef",
  };

  const { classes } = useStyles();
  const laptop = useMediaQuery(`(max-width: 1440px)`);
  return (
    <>
      <Container size={1750}>
        {isLoading ? (
          <Container size={1750} className={classes.loadingContainer}>
            <Text className={classes.loadingBar}>Loading project data</Text>
            <Loader variant="dots" />
          </Container>
        ) : companyData ? (
          <>
            <Grid className={classes.container}>
              {/* <Grid.Col span={4}>
                <SimpleGrid verticalSpacing="lg">
                  <Group style={{margin: "auto"}}>
                    <Image maw={200} radius="md" src={"https://picsum.photos/id/1/200"}/>
                  </Group>
                  <Group style={{margin: "auto"}}>
                    <Title>{companyData?.name}</Title>
                  </Group>
                </SimpleGrid>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text size={24} weight={500} color="white" mt="sm">
                  Description:
                </Text>
                <Text size="md" color="white" mb="xl">
                  {companyData?.description}
                </Text>
              </Grid.Col> */}
              <Grid.Col span={10}>
                <CompanyData
                    impactor={companyData}
                    totalbacked={0}
                    totaldonated={0}
                    
                  ></CompanyData>
              </Grid.Col>

              <Grid.Col span={2}>
              <Group
                  spacing={0}
                  className={classes.links}
                  position="right"
              
                >
                  <SimpleGrid>
                    <Text size="md" weight={500} color="white">
                      Connect on socials
                    </Text>

                    <ActionIcon style={{margin: "auto"}}
                      size="xl"
                      component="a"
                      href={companyData?.twitter ?? undefined}
                    >
                      <IconBrandTwitter size="2rem" stroke={1.5}/>
                    </ActionIcon>
                  
                    <ActionIcon style={{margin: "auto"}}
                      size="xl"
                      component="a"
                      href={companyData?.discord ?? undefined}
                    >
                      <IconBrandDiscord size="2rem" stroke={1.5} />
                    </ActionIcon>
                    
                    <ActionIcon style={{margin: "auto"}}
                      size="xl"
                      component="a"
                      href={companyData?.instagram ?? undefined}
                    >
                      <IconBrandInstagram size="2rem" stroke={1.5} />
                    </ActionIcon>
                  </SimpleGrid>
                  
                </Group>
              </Grid.Col>

              {/* <SimpleGrid
                cols={1}
                verticalSpacing="sm"
                mb="xl"
                className={classes.grid}
              >
                { <AngelImpactor
                  impactor={companyData}
                  totalbacked={0}
                  totaldonated={0}
                ></AngelImpactor> }
              </SimpleGrid> */}
            </Grid>
            <Grid>

            </Grid>
          </>
        ) : (
          <NotFound />
        )}
      </Container>
    </>
  );
}
