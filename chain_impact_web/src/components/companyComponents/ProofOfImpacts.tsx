import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  createStyles,
  Paper,
  Text,
  Title,
  Button,
  useMantineTheme,
  Grid,
  SimpleGrid,
  Container,
  Center,
} from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons";

const useStyles = createStyles((theme, _params, getRef) => ({
  card: {
    height: "150px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: "1rem",
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.1,
    fontWeight: 700,
    textTransform: "uppercase",
  },

  containercss: {
    maxWidth: "100%",
  },

  controls: {
    ref: getRef("controls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  root: {
    "&:hover": {
      [`& .${getRef("controls")}`]: {
        opacity: 1,
      },
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
          IMPACT
        </Text>
      </div>
    </Paper>
  );
}

const data = [
  {
    image:
      "https://raw.githubusercontent.com/RedTechSrb/ChainImpact/master/ChainImpactSmartContract/NFT/NFTsMetadata/generalnft.JPG",
    title: "General Tier 1 NFT",
    category: "generalnft",
  },
  {
    image:
      "https://raw.githubusercontent.com/RedTechSrb/ChainImpact/master/ChainImpactSmartContract/NFT/NFTsMetadata/educationnft.JPG",
    title: "Education Tier 1 NFT",
    category: "educationnft",
  }
  
];

export default function ProofOfImpacts() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Center style={{width: "100%"}}>
      <SimpleGrid cols={1}  style={{width: "100%"}}>
        <Carousel style={{alignItems: "center"}}
          slideSize="16.66667%"
          draggable={false}
          withControls={slides.length > 6}
          breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: "lg" }]}
          slideGap="md"
          align="start"
          loop={true}
          slidesToScroll={mobile ? 1 : 1}
          classNames={classes}
          nextControlIcon={<IconArrowRight size={16}/>}
          previousControlIcon={<IconArrowLeft size={16} />}
          p="5px"
        >
          {slides}
        </Carousel>
      </SimpleGrid>
    </Center>
  );
}
