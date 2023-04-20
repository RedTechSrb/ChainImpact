import { Carousel } from "@mantine/carousel";
import {
  Accordion,
  Button,
  Container,
  createStyles,
  Paper,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  card: {
    height: "480px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  gradientSpan: {
    background: "linear-gradient(to right, #9945FF, #14F195)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },

  titleCard: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: "1rem",
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.9,
    fontWeight: 700,
    textTransform: "uppercase",
  },

  containercss: {
    maxWidth: "100%",
  },
  item: {
    fontSize: theme.fontSizes.md,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
  },
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  title: {
    lineHeight: 1,
    textAlign: "center",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
    fontSize: "2.75rem",
  },
  description: {
    maxWidth: 600,
    margin: "auto",
    fontSize: "1.15rem",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: "#BBFD00",
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: theme.spacing.xl,
    },
  },
}));

interface CardProps {
  image: string;
  title: string;
  category: string;
}

function Card({ image, title, category }: CardProps) {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xs"
      radius="md"
      sx={{
        backgroundImage: `url(${image})`,
        flexDirection: "column",
        flexBasis: "33.3333%",
        flexShrink: 0,
      }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="sm">
          {category}
        </Text>
      </div>
    </Paper>
  );
}

const data1 = [
  {
    image:
      "https://github.com/RedTechSrb/ChainImpact/blob/master/ChainImpactSmartContract/NFT/NFTsMetadata/generalnft.JPG?raw=true",
    title: "Best forests to visit in North America",
    category: "General",
  },
  {
    image:
      "https://github.com/RedTechSrb/ChainImpact/blob/master/ChainImpactSmartContract/NFT/NFTsMetadata/educationnft.JPG?raw=true",
    title: "Hawaii beaches review: better than you think",
    category: "Education",
  },
  {
    image:
      "https://github.com/RedTechSrb/ChainImpact/blob/master/ChainImpactSmartContract/NFT/NFTsMetadata/disasternft.JPG?raw=true",
    title: "Mountains at night: 12 best locations to enjoy the view",
    category: "Disaster Relief",
  },
  {
    image:
      "https://github.com/RedTechSrb/ChainImpact/blob/master/ChainImpactSmartContract/NFT/NFTsMetadata/environmentnft.JPG?raw=true",
    title: "Aurora in Norway: when to visit for best experience",
    category: "Environment",
  },
  {
    image:
      "https://github.com/RedTechSrb/ChainImpact/blob/master/ChainImpactSmartContract/NFT/NFTsMetadata/healthnft.JPG?raw=true",
    title: "Best places to visit this winter",
    category: "Health",
  },
  {
    image:
      "https://github.com/RedTechSrb/ChainImpact/blob/master/ChainImpactSmartContract/NFT/NFTsMetadata/socialnft.JPG?raw=true",
    title: "Active volcanos reviews: travel at your own risk",
    category: "Social",
  },
];

const data2 = [
  {
    image:
      "https://github.com/RedTechSrb/ChainImpact/blob/master/ChainImpactSmartContract/NFT/NFTsMetadata/environmentnft.JPG?raw=true",
    title: "Aurora in Norway: when to visit for best experience",
    category: "Environment",
  },
  {
    image:
      "https://github.com/RedTechSrb/ChainImpact/blob/master/ChainImpactSmartContract/NFT/NFTsMetadata/healthnft.JPG?raw=true",
    title: "Best places to visit this winter",
    category: "Health",
  },
  {
    image:
      "https://github.com/RedTechSrb/ChainImpact/blob/master/ChainImpactSmartContract/NFT/NFTsMetadata/socialnft.JPG?raw=true",
    title: "Active volcanos reviews: travel at your own risk",
    category: "Social",
  },
  {
    image:
      "https://github.com/RedTechSrb/ChainImpact/blob/master/ChainImpactSmartContract/NFT/NFTsMetadata/generalnft.JPG?raw=true",
    title: "Best forests to visit in North America",
    category: "General",
  },
  {
    image:
      "https://github.com/RedTechSrb/ChainImpact/blob/master/ChainImpactSmartContract/NFT/NFTsMetadata/educationnft.JPG?raw=true",
    title: "Hawaii beaches review: better than you think",
    category: "Education",
  },
  {
    image:
      "https://github.com/RedTechSrb/ChainImpact/blob/master/ChainImpactSmartContract/NFT/NFTsMetadata/disasternft.JPG?raw=true",
    title: "Mountains at night: 12 best locations to enjoy the view",
    category: "Disaster Relief",
  },
];

export default function NFTCollection() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const slides1 = data1.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));
  const slides2 = data2.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));
  const mobile = useMediaQuery(`(max-width: 700px)`);
  return (
    <Container size={"lg"} mt="xl">
      <Title className={classes.title} order={2}>
        The <span className={classes.gradientSpan}> Proof of Impact NFT </span> is
        NOT something you can buy. It is something you must earn.
      </Title>
      <Text
        color="white"
        className={classes.description}
        align="center"
        mt="md"
      >
        Each artwork represents a different cause and is a unique piece of art.
        Find out how to earn them and become an Impactor.
      </Text>
      <div className={classes.root}>
        <SimpleGrid cols={1} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <Carousel
            slideSize="33.3333%"
            breakpoints={[
              { maxWidth: "sm", slideSize: "100%", slideGap: "lg" },
            ]}
            slideGap="xs"
            align="start"
            slidesToScroll={mobile ? 1 : 3}
            classNames={classes}
            nextControlIcon={<IconArrowRight size={16} />}
            previousControlIcon={<IconArrowLeft size={16} />}
            p="5px"
          >
            {slides1}
          </Carousel>
        </SimpleGrid>
      </div>
      <div className={classes.root}>
        <SimpleGrid cols={1} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <Carousel
            slideSize="33.3333%"
            breakpoints={[
              { maxWidth: "sm", slideSize: "100%", slideGap: "lg" },
            ]}
            slideGap="xs"
            align="start"
            slidesToScroll={mobile ? 1 : 3}
            classNames={classes}
            nextControlIcon={<IconArrowRight size={16} />}
            previousControlIcon={<IconArrowLeft size={16} />}
            p="5px"
          >
            {slides2}
          </Carousel>
        </SimpleGrid>
      </div>
      <Accordion
        chevronPosition="right"
        defaultValue="reset-password"
        variant="separated"
      >
        <Accordion.Item className={classes.item} value="reset-password">
          <Accordion.Control>
            How can I earn a Proof of Impact?
          </Accordion.Control>
          <Accordion.Panel>
            You can earn a Proof of Impact by supporting a project that is part
            of our platform. You will notice that projects have tags that
            display which type of governance they represent. Each donation to a
            certain tag will bring you closer to earning a Proof of Impact NFT
            of that cause.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="another-account">
          <Accordion.Control>
            What are benefits of being an Impactor?
          </Accordion.Control>
          <Accordion.Panel>
            We will partner with the Ecosystem to provide you with exclusive
            discounts, accesses and similar with the Proof of Impact.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="newsletter">
          <Accordion.Control>
            What is "General" track? What are these tiers?
          </Accordion.Control>
          <Accordion.Panel>
            There are 5 different categories of projects you can earn an NFT
            for. Each donation to a ceratin cause will add up to your total
            impact, for which you will receive a General NFT. <br></br> There
            are 4 milestones you can achieve, each of which will give you a new
            NFT. These milestones are: 50, 200, 1000 and 5000 if you're an
            individual, and 1000, 5000, 20000 and 50000 if you're a company.
            <br></br>
            Better tiers will give you more utility and benefits, while
            showcasing your impact to others.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="credit-card">
          <Accordion.Control>
            I invested $500 into a "Social" project and $4700 in "Environment"
            project. Which NFTs will I get? Do I get a general NFT?
          </Accordion.Control>
          <Accordion.Panel>
            All the impact you made will be added up. In this example you've
            donated a total of $5200, which will give you: Tier 1, 2, 3 of the
            Environment NFT, Tier 1,2 of the Social NFT and all four tiers in
            General category. When donating you will see how much you need to
            get the NFT of the next tier.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Button
        color="lime"
        radius="md"
        size="xl"
        compact
        mb="xl"
        mt="xl"
        style={{ fontFamily: "Space Mono, monospace", fontWeight: 100 }}
      >
        Get your Proof of Impact.
      </Button>
    </Container>
  );
}
