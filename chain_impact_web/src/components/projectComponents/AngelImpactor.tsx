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
import { Impactor } from "../../models/Impactor";
import NftShowcaseCarousel from "./NftShowcaseCarousel";
import RecentImpactors from "./RecentImpactors";

interface AngelImpactorProps {
  impactor: Impactor | null;
  totalbacked: number;
  totaldonated: number;
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
  impactor,
  totalbacked,
  totaldonated,
}: AngelImpactorProps) {
  const { classes } = useStyles();

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
      <Grid>
        <Grid.Col span={4}>
          <Image
            src="https://picsum.photos/id/1/200" //{impactor?.imageurl}
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
              Total donated: {totaldonated}
            </Text>
            <Text ta="left" c="dimmed" fz="lg">
              Projects involved in: {totalbacked}
            </Text>
            <Text ta="left" c="dimmed" fz="lg">
              Proof of Impact NFT's: 3
            </Text>
          </div>
        </Grid.Col>

        <Grid.Col span={12}>
          <NftShowcaseCarousel></NftShowcaseCarousel>
        </Grid.Col>
      </Grid>

      <Button variant="default" fullWidth mt="md">
        Other projects they supported
      </Button>
    </Paper>
  );
}
