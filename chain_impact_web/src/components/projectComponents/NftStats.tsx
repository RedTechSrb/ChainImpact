import {
  RingProgress,
  Text,
  SimpleGrid,
  Paper,
  Center,
  Group,
  Image,
  Grid,
  Flex,
} from "@mantine/core";
import { IconCurrencyDollar, IconPictureInPicture } from "@tabler/icons";

interface StatsRingProps {
  data: {
    label: string;
    stats: string;
    progress: number;
    color: string;
  }[];
  progress: number;
}

export function NftStats({ data, progress }: StatsRingProps) {
  const stats = data.map((stat) => {
    return (
      <Paper withBorder p="xs" key={stat.label}>
        <Grid>
          <Grid.Col span={6}>
            <Image
              src="https://www.arweave.net/XuW3IePl-7omXSkY8cqcwupcbQYMg5u8ebh2viTBayU?ext=PNG" //{impactor?.imageurl}
              mx="auto"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Center>
              <Flex
                mih={50}
                gap="xs"
                justify="flex-start"
                align="flex-start"
                direction="column"
                wrap="wrap"
              >
                <RingProgress
                  size={80}
                  roundCaps
                  thickness={8}
                  sections={[{ value: progress, color: stat.color }]}
                  label={
                    <Center>
                      <IconCurrencyDollar size="1.4rem" stroke={1.5} />
                    </Center>
                  }
                />

                <div>
                  <Text
                    color="dimmed"
                    size="xs"
                    transform="uppercase"
                    weight={700}
                    align="center"
                  >
                    {stat.label}
                  </Text>
                  {progress !== 100 ? (
                    <Text weight={700} size="md" align="center">
                      You need {100 - progress} more to become an Impactor!
                    </Text>
                  ) : (
                    <Text weight={700} size="md" align="center">
                      You are an Impactor! This NFT is yours!
                    </Text>
                  )}
                </div>
              </Flex>
            </Center>
          </Grid.Col>
        </Grid>
      </Paper>
    );
  });

  return (
    <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
      {stats}
    </SimpleGrid>
  );
}
