import {
  Avatar,
  Text,
  Button,
  Paper,
  SimpleGrid,
  Container,
  Grid,
} from "@mantine/core";
import NftShowcaseCarousel from "./NftShowcaseCarousel";
import RecentImpactors from "./RecentImpactors";

interface UserInfoActionProps {
  imageurl: string;
  name: string;
  wallet: string;
}

export default function AngelImpactor({
  imageurl,
  name,
  wallet,
}: UserInfoActionProps) {
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
            <Text ta="left" fz="lg" weight={500}>
              {name}
            </Text>
            <Text ta="left" c="dimmed" fz="sm">
              Total donated: $1500
            </Text>
            <Text ta="left" c="dimmed" fz="sm">
              Projects involved in: 7
            </Text>
            <Text ta="left" c="dimmed" fz="sm">
              Proof of Impact NFT's: 3
            </Text>

            <NftShowcaseCarousel></NftShowcaseCarousel>
          </div>
        </Grid.Col>
      </Grid>

      <Button variant="default" fullWidth mt="md">
        Other projects they supported
      </Button>
    </Paper>
  );
}
