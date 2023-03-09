import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
} from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 100,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export default function MobileVersionSoon() {
  const { classes, theme } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.label}>LFG</div>
      <Title className={classes.title}>Coming soon</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        Unfortunately, Mobile site is not available yet. Please use desktop!
      </Text>
      <Group position="center">
        <Button variant="subtle" size="md">
          <Link
            to="/"
            style={{
              color: theme.colorScheme === "dark" ? theme.white : theme.black,
            }}
          >
            Take me back to home page
          </Link>
        </Button>
      </Group>
    </Container>
  );
}
