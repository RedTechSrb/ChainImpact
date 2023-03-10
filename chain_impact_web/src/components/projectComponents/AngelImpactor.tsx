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
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ImpactorWalletSearch } from "../../models/dto/request/ImpactorWalletSearch";
import { AngelImpactorData } from "../../models/dto/response/AngelImpactorData";
import { Impactor } from "../../models/Impactor";
import { useGetAngelImpactorData } from "../../repositories/ImpactorRepository";
import NftShowcaseCarousel from "./NftShowcaseCarousel";
import RecentImpactors from "./RecentImpactors";

interface AngelImpactorProps {
  impactor: Impactor | null;
}

const useStyles = createStyles((theme) => ({
  angelimpactor: {
    fontSize: "1.5rem",
  },
  image: {
    maxHeight: "120px",
    maxWidth: "120px",
  },
}));

export default function AngelImpactor({
  impactor
}: AngelImpactorProps) {
  const { classes } = useStyles();

  const isMobile = useMediaQuery("(max-width: 600px)");
  const href = isMobile ? `/mobile` : `/company/${impactor?.wallet}`;

  const angelImpactorData: AngelImpactorData | undefined = useGetAngelImpactorData(new ImpactorWalletSearch(null, null, impactor?.wallet ?? ""))

  return (
    <Paper
      radius="md"
      withBorder
      p="md"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      { angelImpactorData &&
        <Grid>
        <Grid.Col span={4}>
          <Image
            src={impactor?.imageurl} //{impactor?.imageurl}
            radius={20}
            mx="auto"
            className={classes.image}
          />
        </Grid.Col>
        <Grid.Col span={8}>
          <div>
            <Text ta="left" weight={500} className={classes.angelimpactor}>
              {impactor?.name}
            </Text>
            <Text ta="left" c="dimmed" fz="xl">
              Total donated: {angelImpactorData?.totalDonated}
            </Text>
            <Text ta="left" c="dimmed" fz="lg">
              Projects involved in: {angelImpactorData?.totalProjects}
            </Text>
            <Text ta="left" c="dimmed" fz="lg">
              Proof of Impact NFT's: 3
            </Text>
          </div>
        </Grid.Col>

        <Grid.Col span={12}>
          <NftShowcaseCarousel></NftShowcaseCarousel>
        </Grid.Col>
      </Grid>}

      { angelImpactorData &&
      <Button variant="default" fullWidth mt="md" component="a"
            href={href}>
        Other projects they supported
      </Button>}

      { !angelImpactorData &&
      <>
        <Text size={25} align={"center"}>
          Project is still new, so it could still be <span style={{color: "#BBFD00"}}>You</span>!
        </Text>
        <Text size={25} align={"center"}>
            Become an Angel Impactor by donating!
        </Text>
      </>
      }

    </Paper>
  );
}
