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
import { Project } from "../../models/Project";

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
        <Text size="sm" mt="xs" style={{minHeight: "45px"}} >
          {description}
        </Text>
      </Card.Section>

      
    </Card>
  );
}
