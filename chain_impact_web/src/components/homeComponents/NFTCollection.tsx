import { Carousel } from "@mantine/carousel";
import {
  createStyles,
  Group,
  Paper,
  Text,
  Button,
  ThemeIcon,
  SimpleGrid,
  Container,
  Title,
  useMantineTheme,
  Accordion,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconArrowLeft, IconArrowRight, IconArrowUpRight } from "@tabler/icons";

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
      "https://github.com/RedTechSrb/ChainImpact/blob/master/ChainImpactSmartContract/NFT/NFTsMetadata/environmentnft.JPG?raw=true",
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
      "https://www.arweave.net/L2xx_TKhUOImmE3YF9q8aqO23KYTFO8FILERCdSeMwc?ext=PNG",
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

interface StatsGridIconsProps {
  data: { title: string; value: string; diff: number }[];
}

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
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return (
    <Container size={"lg"} mt="xl">
      <Title className={classes.title} order={2}>
        <span className={classes.gradientSpan}> Proof of Impact NFT </span> is
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
            You start by selecting a project that aligns with your values. We've
            partnered with a number of charity organizations to bring different
            ESG projects. Collaborate with the Angel Impactors to bring a
            project to it's goal by donating. Impactors will receive a Proof of
            Impact NFT.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="another-account">
          <Accordion.Control>
            What are benefits of being an Impactor
          </Accordion.Control>
          <Accordion.Panel>
            Investing in ESG projects not only helps create positive impact on
            society and the environment, but it can also lead to increased
            revenue opportunities and long-term sustainability for your
            business. Our platform allows you to easily track and showcase your
            ESG efforts, and connect with impact investors and customers who
            share your values. <br></br>
            Also it feels good to know you helped make a difference.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="newsletter">
          <Accordion.Control>
            What is "General" track? What are these tiers?
          </Accordion.Control>
          <Accordion.Panel>
            Angel Impactors are companies that are first to support a certain
            charity project by making an initial donation to it. They help
            ensure that the project is carried out successfully by providing
            financial support. They are always showcased in the project page.
            This way companies can truly show their values.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="credit-card">
          <Accordion.Control>
            How are tiered rewards distributed?
          </Accordion.Control>
          <Accordion.Panel>
            At Chain Impact, we use blockchain technology to provide
            transparency and accountability for every donation. Each donation is
            recorded on the blockchain, which means that it cannot be altered or
            tampered with. Additionally, we work with trusted and vetted charity
            organizations to ensure that your donations go to the right place
            and are used for their intended purpose. You can also track the
            progress of the projects you support and see how your donation is
            making an impact in real-time.
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
        NFT is waiting for you! Come and get it.
      </Button>
    </Container>
  );
}
