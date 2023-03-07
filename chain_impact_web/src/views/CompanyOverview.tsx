import {
  ActionIcon,
  Container,
  createStyles,
  Grid,
  Group,
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
          <Grid className={classes.container}>
            {/* <Image
                  src="https://media.istockphoto.com/id/506664332/photo/business-with-csr-practice.jpg?s=1024x1024&w=is&k=20&c=qKTzGl0Wec-oxJ_sU-eTcPDzooTSqIyHIh3rmIeUNcI="
                  alt="alt"
                  height={180}
                  mb="md"
                /> */}
            <SimpleGrid cols={2} verticalSpacing="sm">
              <Group>
                <Title>{companyData?.name}</Title>
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
                  href={companyData?.twitter ?? undefined}
                >
                  <IconBrandTwitter size="1.05rem" stroke={1.5} />
                </ActionIcon>
                <ActionIcon
                  size="lg"
                  component="a"
                  href={companyData?.discord ?? undefined}
                >
                  <IconBrandDiscord size="1.05rem" stroke={1.5} />
                </ActionIcon>
                <ActionIcon
                  size="lg"
                  component="a"
                  href={companyData?.instagram ?? undefined}
                >
                  <IconBrandInstagram size="1.05rem" stroke={1.5} />
                </ActionIcon>
              </Group>
            </SimpleGrid>

            <Text size={24} weight={500} color="white" mt="sm">
              Description:
            </Text>
            <Text size="md" color="white" mb="xl">
              {companyData?.description}
            </Text>

            <SimpleGrid
              cols={1}
              verticalSpacing="sm"
              mb="xl"
              className={classes.grid}
            >
              <AngelImpactor
                impactor={companyData}
                totalbacked={0}
                totaldonated={0}
              ></AngelImpactor>
            </SimpleGrid>
          </Grid>
        ) : (
          <NotFound />
        )}
      </Container>
    </>
  );
}
