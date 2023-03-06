import { IconHeart } from "@tabler/icons";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
  Avatar,
  Progress,
  Container,
  SimpleGrid,
  Spoiler,
} from "@mantine/core";
import { Project } from "../models/Project";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  gradientSpan: {
    background: "linear-gradient(to right, #9945FF, #14F195)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

export default function ProjectComponent({
  imageurl,
  name,
  description,
  primarycausetype,
  secondarycausetype,
  angelimpactor,
  totaldonated,
  financialgoal,
  charity,
}: Project) {
  const { classes, theme } = useStyles();

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={imageurl} alt={name} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text size="lg" weight={500}>
            {name}
          </Text>
          <Group position="right">
            <Badge size="sm">{primarycausetype.name}</Badge>
            <Badge size="sm">{secondarycausetype.name}</Badge>
          </Group>
        </Group>
        <Text size="sm" mt="xs">
          <Spoiler
            showLabel="Read more"
            hideLabel="Read less"
            maxHeight={3 * theme.fontSizes.sm} // Change the value as per your requirement
          >
            {description}
          </Spoiler>
        </Text>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs">
          <Text size="md" weight={500}>
            Angel Impactor
          </Text>
          <Text size="md" weight={500}>
            Charity
          </Text>
          <Group>
            <Avatar src={angelimpactor?.imageurl} radius="xl" />

            <div style={{ flex: 1 }}>
              {totaldonated !== 0 ? (
                <Text size="sm" weight={500}>
                  {angelimpactor?.name}
                </Text>
              ) : (
                <Text size="sm" weight={500}>
                  Your company name and logo can be here too!
                </Text>
              )}
              <Text color="dimmed" size="xs">
                {angelimpactor?.wallet}
              </Text>
            </div>
          </Group>
          <Group>
            <Avatar src={charity.imageurl} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {charity.name}
              </Text>

              <Text color="dimmed" size="xs">
                {charity.wallet}
              </Text>
            </div>
          </Group>
        </SimpleGrid>

        <Text size="lg" weight={500} mt="lg">
          Project Goal ${totaldonated} / ${financialgoal}
        </Text>
        <Progress
          value={((totaldonated * 1.0) / financialgoal) * 100}
          label={((totaldonated * 1.0) / financialgoal) * 100 + "%"}
          mt="sm"
          size="xl"
          radius="xl"
        />
      </Card.Section>

      {totaldonated !== 0 ? (
        <Group mt="xs">
          <Button radius="md" style={{ flex: 1 }} color="lime">
            Donate
          </Button>
        </Group>
      ) : (
        <Group mt="xs">
          <Text size="lg" weight={500} mt="lg">
            Be the first company to donate and become an Angel Impactor.
            Showcase your company values by making a project your own.
          </Text>

          <Button radius="md" style={{ flex: 1 }} color="pink">
            Become Angel Investor
          </Button>
        </Group>
      )}
    </Card>
  );
}
