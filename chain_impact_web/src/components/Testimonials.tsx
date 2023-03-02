import {
  Image,
  Text,
  Container,
  ThemeIcon,
  Title,
  SimpleGrid,
  createStyles,
} from "@mantine/core";

import googleImage from "../res/images/faq_image.png";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: 80,
    paddingBottom: 50,
  },

  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  itemIcon: {
    padding: theme.spacing.xs,
    marginRight: theme.spacing.md,
  },

  itemTitle: {
    marginBottom: theme.spacing.xs / 2,
  },

  supTitle: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: 800,
    fontSize: theme.fontSizes.sm,
    color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
      .color,
    letterSpacing: 0.5,
  },

  title: {
    lineHeight: 1,
    textAlign: "center",
    marginTop: theme.spacing.xl,
    fontSize: "2.5rem",
  },

  description: {
    textAlign: "center",
    marginTop: theme.spacing.md,
    fontSize: theme.fontSizes.lg,
  },

  highlight: {
    color: theme.colorScheme === "dark" ? theme.white : "inherit",
  },
}));

interface FeatureImage {
  image: string;
  title: React.ReactNode;
}

interface FeaturesImagesProps {
  supTitle: React.ReactNode;
  description: React.ReactNode;
  data: FeatureImage[];
}

export default function Testimonials({
  supTitle,
  description,
  data,
}: FeaturesImagesProps) {
  const { classes } = useStyles();

  const items = data.map((item) => (
    <div className={classes.item} key={item.image}>
      <ThemeIcon
        variant="light"
        className={classes.itemIcon}
        size={150}
        radius="md"
      >
        <Image src={require("../res/images/" + item.image)} />
      </ThemeIcon>

      {/* <div>
        <Text weight={700} size="lg" className={classes.itemTitle}>
          {item.title}
        </Text>
      </div> */}
    </div>
  ));

  return (
    <Container size="lg" className={classes.wrapper}>
      <Title className={classes.title} order={2}>
        <span className={classes.highlight}> Have your web3 company </span>{" "}
        among the greats.
      </Title>

      <Container size={660} p={0}>
        <Text color="white" className={classes.description}>
          {description}
        </Text>
      </Container>

      <SimpleGrid
        cols={4}
        // spacing={50}
        //breakpoints={[{ maxWidth: 550, cols: 2, spacing: 40 }]}
        style={{ marginTop: 40 }}
        p="sm"
      >
        {items}
      </SimpleGrid>
    </Container>
  );
}
