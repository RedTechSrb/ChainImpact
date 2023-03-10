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
import SupportedProjects from "../components/companyComponents/SupportedProjects";
import { Impactor } from "../models/Impactor";
import { Project } from "../models/Project";
import { getSpecificImpactor, useGetAllImpactors, useGetImpactorsWithProjects } from "../repositories/ImpactorRepository";
import { useGetSpecificProject } from "../repositories/ProjectRepository";
import NotFound from "./NotFound";
import {ImpactorWalletSearch} from '../models/dto/request/ImpactorWalletSearch';
import { ImpactorsWithProjectsSearch } from "../models/dto/request/ImpactorsWithProjectsSearch";

const PRIMARY_COL_HEIGHT = "32rem";

const useStyles = createStyles((theme) => ({
  container: {
    marginLeft: "3rem",
    marginRight: "2rem",
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

  const { wallet }: any = useParams();
  const [impactor, setImpactor] = useState<Impactor>();
  let impactorData: Promise<any>;

  const [isLoading, setIsLoading] = useState(true);

  const mobile = useMediaQuery(`(max-width: 900px)`);
  let { id } = useParams();
  //const projectSearch = { dto: { id: Number(id) } };

  const impactorsWithProjectsSearchDto = new ImpactorsWithProjectsSearch(wallet);
  const projectsWithDonations = useGetImpactorsWithProjects(impactorsWithProjectsSearchDto);
  let totalDonated = 0;
  const projects = projectsWithDonations.map((projectWithDonations) => {
    totalDonated += projectWithDonations.totalDonation;
    return projectWithDonations.project
  })

  function setImpactorData() {
    impactorData = getSpecificImpactor(
        new ImpactorWalletSearch(null, null, wallet)
      )
    impactorData.then(data => {
      setImpactor(data);
      setIsLoading(false)
    })
  }

  useEffect(() => {
    setImpactorData()
    let header = document.getElementById("header");
    header?.scrollIntoView();

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoading]);

  const { classes } = useStyles();
  const laptop = useMediaQuery(`(max-width: 1440px)`);
  return (
    <>
      <Container size={1750}>
        {isLoading ? (
          <Container size={1750} className={classes.loadingContainer}>
            <Text className={classes.loadingBar}>Loading impactor data</Text>
            <Loader variant="dots" />
          </Container>
        ) : impactor ? (
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
              <Grid.Col span={1} />
              <Grid.Col span={10}>
                <CompanyData
                    impactor={impactor}
                    totalbacked={projects.length}
                    totaldonated={totalDonated}
                    projects={projectsWithDonations}
                  ></CompanyData>
              </Grid.Col>
              <Grid.Col span={1} />

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
