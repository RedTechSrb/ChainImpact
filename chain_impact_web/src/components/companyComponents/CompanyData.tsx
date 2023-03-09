import {
  Avatar,
  Text,
  Button,
  Paper,
  SimpleGrid,
  Container,
  Grid,
  createStyles,
  Image,
  Divider,
  Group,
  ActionIcon,
  Flex,
} from "@mantine/core";
import {
  IconBrandDiscord,
  IconBrandInstagram,
  IconBrandTwitter,
} from "@tabler/icons";
import { ProjectWithTotalDonations } from "../../models/dto/response/ProjectWithTotalDonations";
import { Impactor } from "../../models/Impactor";
import { Project } from "../../models/Project";
import NftShowcaseCarousel from "../projectComponents/NftShowcaseCarousel";
import RecentImpactors from "../projectComponents/RecentImpactors";
import ProofOfImpacts from "./ProofOfImpacts";
import SupportedProjects from "./SupportedProjects";

interface CompanyDataProps {
  impactor: Impactor;
  totalbacked: number;
  totaldonated: number;
  projects: ProjectWithTotalDonations[];
}

const useStyles = createStyles((theme) => ({
  angelimpactor: {
    fontSize: "2.2rem",
    color: "white",
  },
  image: {
    maxHeight: "140px",
    maxWidth: "140px",
  },
  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export default function CompanyData({
  impactor,
  totalbacked,
  totaldonated,
  projects,
}: CompanyDataProps) {
  const { classes } = useStyles();

  return (
    <Paper
      radius="md"
      p="md"
      // sx={(theme) => ({
      //   backgroundColor:
      //     theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      // })}
    >
      <Grid>
        <Grid.Col span={10}>
          <Flex>
            <Container size={200} fluid={false} style={{ margin: "auto 0" }}>
              <Image
                src={impactor?.imageurl} //{impactor?.imageurl}
                radius={10}
                mx="auto"
                className={classes.image}
                pl={0}
              />
            </Container>
            <Container size={500} fluid={false} style={{ marginLeft: "0" }}>
              <Text ta="left" weight={500} className={classes.angelimpactor}>
                {impactor?.name ? (
                  impactor.name
                ) : (
                  <span style={{ fontSize: "1.2rem" }}>{impactor.wallet}</span>
                )}
              </Text>
              <Text ta="left" c="dimmed" fz="xl">
                Total donated: {totaldonated}
              </Text>
              <Text ta="left" c="dimmed" fz="lg">
                Projects involved in: {totalbacked}
              </Text>
              <Text ta="left" c="dimmed" fz="lg">
                Proof of Impact NFT's: 5
              </Text>
              <Text ta="left" fz="sm">
                Address: {impactor.wallet}
              </Text>
            </Container>
          </Flex>
        </Grid.Col>

        <Grid.Col span={2}>
          <Group spacing={0} className={classes.links} position="right">
            <Grid>
              <Grid.Col span={12} style={{ textAlign: "center" }}>
                <Text size="md" weight={500} color="white">
                  Connect on socials
                </Text>
              </Grid.Col>

              <Grid.Col span={4}>
                <ActionIcon
                  style={{ margin: "auto" }}
                  size="xl"
                  component="a"
                  href={impactor?.twitter ?? undefined}
                  target="_blank"
                >
                  <IconBrandTwitter size="2rem" stroke={1.5} />
                </ActionIcon>
              </Grid.Col>

              <Grid.Col span={4}>
                <ActionIcon
                  style={{ margin: "auto" }}
                  size="xl"
                  component="a"
                  href={impactor?.discord ?? undefined}
                  target="_blank"
                >
                  <IconBrandDiscord size="2rem" stroke={1.5} />
                </ActionIcon>
              </Grid.Col>

              <Grid.Col span={4}>
                <ActionIcon
                  style={{ margin: "auto" }}
                  size="xl"
                  component="a"
                  href={impactor?.instagram ?? undefined}
                  target="_blank"
                >
                  <IconBrandInstagram size="2rem" stroke={1.5} />
                </ActionIcon>
              </Grid.Col>
            </Grid>
          </Group>
        </Grid.Col>

        <Grid.Col span={12}>
          <Divider my="xs" label="Proof of Impacts" labelPosition="center" />
        </Grid.Col>

        <Grid.Col span={12} style={{ width: "100%" }}>
          <ProofOfImpacts />
        </Grid.Col>

        <Grid.Col span={12}>
          <Divider my="xs" label="Supported projects" labelPosition="center" />
        </Grid.Col>

        <Grid.Col span={12}>
          <SupportedProjects
            projects={projects}
            impactorName={impactor.name}
          ></SupportedProjects>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
