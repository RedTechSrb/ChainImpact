import {
  Avatar,
  Text,
  Button,
  Paper,
  SimpleGrid,
  Container,
  Grid,
  createStyles,
} from "@mantine/core";
import NftShowcaseCarousel from "./NftShowcaseCarousel";
import RecentImpactors from "./RecentImpactors";

interface UserInfoActionProps {
  imageurl: string;
  name: string;
  wallet: string;
}

const useStyles = createStyles((theme) => ({
  angelimpactor: {
    fontSize: "1.5rem",
  },
}));

export default function AngelImpactor({
  imageurl,
  name,
  wallet,
}: UserInfoActionProps) {
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
          <Avatar src={imageurl} size={140} radius={20} mx="auto" />
        </Grid.Col>
        <Grid.Col span={8}>
          <div>
            <Text ta="left" weight={500} className={classes.angelimpactor}>
              {name}
            </Text>
            <Text ta="left" c="dimmed" fz="xl">
              Total donated: $1500
            </Text>
            <Text ta="left" c="dimmed" fz="lg">
              Projects involved in: 7
            </Text>
            <Text ta="left" c="dimmed" fz="lg">
              Proof of Impact NFT's: 3
            </Text>
          </div>
        </Grid.Col>
        <NftShowcaseCarousel></NftShowcaseCarousel>
      </Grid>

      <Button variant="default" fullWidth mt="md">
        Other projects they supported
      </Button>
    </Paper>
  );
}
