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
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
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

interface AngelImpactorProps {
  image: string;
  name: string;
  address: string;
}

interface CharityProps {
  image: string;
  name: string;
  address: string;
}

interface ProjectProps {
  image: string;
  title: string;
  description: string;
  primarytag: string;
  secondarytag: string;
  angelimapctor: AngelImpactorProps;
  charity: CharityProps;
  totaldonated: number;
  goal: number;
}

export default function Project({
  image,
  title,
  description,
  primarytag,
  secondarytag,
  angelimapctor,
  totaldonated,
  goal,
  charity,
}: ProjectProps) {
  const { classes, theme } = useStyles();

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text size="lg" weight={500}>
            {title}
          </Text>
          <Group position="right">
            <Badge size="sm">{primarytag}</Badge>
            <Badge size="sm">{secondarytag}</Badge>
          </Group>
        </Group>
        <Text size="sm" mt="xs">
          {description}
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
            <Avatar src={angelimapctor.image} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {angelimapctor.name}
              </Text>

              <Text color="dimmed" size="xs">
                {angelimapctor.address}
              </Text>
            </div>
          </Group>
          <Group>
            <Avatar src={charity.image} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {charity.name}
              </Text>

              <Text color="dimmed" size="xs">
                {charity.address}
              </Text>
            </div>
          </Group>
        </SimpleGrid>

        <Text size="lg" weight={500} mt="lg">
          Project Goal ${totaldonated} / ${goal}
        </Text>
        <Progress
          value={((totaldonated * 1.0) / goal) * 100}
          label={((totaldonated * 1.0) / goal) * 100 + "%"}
          mt="sm"
          size="xl"
          radius="xl"
        />
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }} color="lime">
          Donate
        </Button>
      </Group>
    </Card>
  );
}